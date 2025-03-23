import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string()
    },
    handler: async (ctx, args) => {
        //If user already exist in table
        const users = await ctx.db.query("user")
            .filter((q) => q.eq(q.field("email"), args.email))
            .collect();

        if (users.length === 0) {
            //if not then only -> add user
            const data = {
                name: args.name,
                email: args.email,
                picture: args.picture,
                credits: 5000
            }
            const result = await ctx.db.insert('user', data);
            return data;
        }

        return users[0]
    }
})