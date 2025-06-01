import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { env } from './env.config';
import { User } from '../modules/users/user.model';

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET,
    algorithms: ['HS256'] as const,
    ignoreExpiration: false,
    passReqToCallback: true,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (req, payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        return done(null, user.toJSON());
    } catch (error) {
        return done(error, false);
    }
});

passport.use('jwt', jwtStrategy);

export const passportInitialize = passport.initialize();

export const authenticate = passport.authenticate('jwt', { session: false });

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id: string, done) => {
    try {
        const user = await User.findById(_id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
