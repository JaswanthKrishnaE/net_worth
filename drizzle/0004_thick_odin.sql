CREATE TABLE `sub_classes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `instruments` ADD `entity_id` integer NOT NULL REFERENCES entities(id);--> statement-breakpoint
ALTER TABLE `instruments` ADD `sub_class_id` integer REFERENCES sub_classes(id);