-- DROP DATABASE IF EXISTS sdc;
-- CREATE DATABASE sdc;

-- CREATE SCHEMA myschema;


-- may not need references to styles, features
CREATE TABLE products (
  id integer PRIMARY KEY,
  name varchar(50),
  slogan varchar(500),
  description varchar(500),
  category varchar(20),
  default_price decimal
  -- feature_id smallint REFERENCES features(id),
  -- style_id integer REFERENCES styles(id)
  --   ON DELETE cascade
  --   ON UPDATE cascade
);

CREATE TABLE features (
  id serial PRIMARY KEY,
  name varchar(100),
  characteristic varchar(100),
  product_id integer REFERENCES products(id)
    ON DELETE cascade
    ON UPDATE cascade
  );


-- may not need references to skus, photos
CREATE TABLE styles (
  id integer PRIMARY KEY,
  product_id integer REFERENCES products(id)
    ON DELETE cascade
    ON UPDATE cascade,
  name varchar(30),
  sale_price varchar(10),
  original_price decimal,
  default_style boolean
  -- photos_id smallint REFERENCES photos(id),
  -- sku_id integer REFERENCES skus(id)

  );


CREATE TABLE skus (
  id integer PRIMARY KEY,
  quantity smallint,
  size varchar(20),
  style_id integer REFERENCES styles(id)
    ON DELETE cascade
    ON UPDATE cascade

  );


CREATE TABLE related_products (
  id integer PRIMARY KEY,
  product_id integer REFERENCES products(id)
    ON DELETE cascade
    ON UPDATE cascade,
  related_id integer

  );


  CREATE TABLE photos (
  id integer PRIMARY KEY,
  style_id integer REFERENCES styles(id)
    ON DELETE cascade
    ON UPDATE cascade,
  thumnbnail_url varchar(500),
  main_url varchar(500)

  );



-- CREATE [ [ GLOBAL | LOCAL ] { TEMPORARY | TEMP } | UNLOGGED ] TABLE [ IF NOT EXISTS ] table_name ( [
--   { column_name data_type [ COMPRESSION compression_method ] [ COLLATE collation ] [ column_constraint [ ... ] ]
--     | table_constraint
--     | LIKE source_table [ like_option ... ] }
--     [, ... ]
-- ] )
-- [ INHERITS ( parent_table [, ... ] ) ]
-- [ PARTITION BY { RANGE | LIST | HASH } ( { column_name | ( expression ) } [ COLLATE collation ] [ opclass ] [, ... ] ) ]
-- [ USING method ]
-- [ WITH ( storage_parameter [= value] [, ... ] ) | WITHOUT OIDS ]
-- [ ON COMMIT { PRESERVE ROWS | DELETE ROWS | DROP } ]
-- [ TABLESPACE tablespace_name ]

-- [ WITH [ RECURSIVE ] with_query [, ...] ]
-- UPDATE [ ONLY ] table_name [ * ] [ [ AS ] alias ]
--     SET { column_name = { expression | DEFAULT } |
--           ( column_name [, ...] ) = [ ROW ] ( { expression | DEFAULT } [, ...] ) |
--           ( column_name [, ...] ) = ( sub-SELECT )
--         } [, ...]
--     [ FROM from_item [, ...] ]
--     [ WHERE condition | WHERE CURRENT OF cursor_name ]
--     [ RETURNING * | output_expression [ [ AS ] output_name ] [, ...] ]