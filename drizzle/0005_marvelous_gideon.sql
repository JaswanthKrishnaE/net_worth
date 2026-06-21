PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`broker_id` integer NOT NULL,
	`instrument_id` integer NOT NULL,
	`status_id` integer NOT NULL,
	`date` integer NOT NULL,
	`units` real NOT NULL,
	`price_per_unit` real NOT NULL,
	`value` real NOT NULL,
	`description` text,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`broker_id`) REFERENCES `brokers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`instrument_id`) REFERENCES `instruments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`status_id`) REFERENCES `transaction_status`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "profile_id", "broker_id", "instrument_id", "status_id", "date", "units", "price_per_unit", "value", "description") SELECT "id", "profile_id", "broker_id", "instrument_id", "status_id", "date", "units", "price_per_unit", "value", "description" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;