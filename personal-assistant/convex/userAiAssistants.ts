import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
  args: {
    records: v.any(),
    uid: v.id('user')
  },
  handler: async (ctx, args) => {
    const insertedIds = await Promise.all(
      args.records.map(async (record: any) => {
        return await ctx.db.insert('userAiAssistants', {
          ...record,
          uid: args.uid
        })
      })
    );
    return insertedIds;
  }
})