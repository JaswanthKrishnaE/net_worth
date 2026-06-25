import { sqliteTable, integer, text} from "drizzle-orm/sqlite-core";
import { entities } from "./entity.schema";
import { assets ,subClass} from "./assets.schema";

export const instruments = sqliteTable("instruments", {
        id: integer("id").primaryKey({ autoIncrement: true }),
        name: text("name").notNull(), 
        symbol: text("symbol"),
        //EQUITY  , GOLD ,SILVER
        assetId: integer("asset_id").references(() => assets.id),
        //stock, etf , mutual fund , nps
        entityId: integer("entity_id").references(() => entities.id).notNull(),
        //large cap , mid cap , small cap
        subClassId: integer("sub_class_id").references(() => subClass.id),

        //META DATA
        metadata: text("metadata", { mode: 'json' }),
});