import { Migration } from '@mikro-orm/migrations';

export class Migration20241122142735 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "product" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, constraint "product_pkey" primary key ("id"), constraint product_price_check check (price > 0));`,
    );

    this.addSql(
      `create table "user" ("id" uuid not null default gen_random_uuid(), "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in ('admin', 'user')) not null, constraint "user_pkey" primary key ("id"));`,
    );
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(
      `create table "cart" ("id" uuid not null default gen_random_uuid(), "is_deleted" boolean not null default false, "user_id" uuid not null, constraint "cart_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "order" ("id" uuid not null default gen_random_uuid(), "status" text check ("status" in ('created', 'completed')) not null default 'created', "total" int not null, "user_id" uuid not null, "cart_id" uuid not null, constraint "order_pkey" primary key ("id"), constraint order_total_check check (total > 0));`,
    );

    this.addSql(
      `create table "order_item" ("order_id" uuid not null, "product_id" uuid not null, "count" int not null, constraint "order_item_pkey" primary key ("order_id", "product_id"), constraint order_item_count_check check (count > 0));`,
    );

    this.addSql(
      `create table "cart_item" ("cart_id" uuid not null, "product_id" uuid not null, "count" int not null, constraint "cart_item_pkey" primary key ("cart_id", "product_id"), constraint cart_item_count_check check (count > 0));`,
    );

    this.addSql(
      `alter table "cart" add constraint "cart_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "order" add constraint "order_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "order_item" add constraint "order_item_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "order_item" add constraint "order_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "cart_item" add constraint "cart_item_cart_id_foreign" foreign key ("cart_id") references "cart" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "cart_item" add constraint "cart_item_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "order_item" drop constraint "order_item_product_id_foreign";`);

    this.addSql(`alter table "cart_item" drop constraint "cart_item_product_id_foreign";`);

    this.addSql(`alter table "cart" drop constraint "cart_user_id_foreign";`);

    this.addSql(`alter table "order" drop constraint "order_user_id_foreign";`);

    this.addSql(`alter table "order" drop constraint "order_cart_id_foreign";`);

    this.addSql(`alter table "cart_item" drop constraint "cart_item_cart_id_foreign";`);

    this.addSql(`alter table "order_item" drop constraint "order_item_order_id_foreign";`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "cart" cascade;`);

    this.addSql(`drop table if exists "order" cascade;`);

    this.addSql(`drop table if exists "order_item" cascade;`);

    this.addSql(`drop table if exists "cart_item" cascade;`);
  }
}
