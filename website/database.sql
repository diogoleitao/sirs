DROP TABLE if exists testimonial;
DROP TABLE if exists mailinglist;
DROP TABLE if exists login;

create table testimonial
   (test        varchar(255)    not null,
    id          numeric(2,0)    not null unique,
    primary key(id));

create table mailinglist
   (name        varchar(100) not null,
    email       varchar(100) not null unique,
    primary key(email));

create table login
	(username   varchar(10) not null unique,
	 password 	varchar(10) not null,
	 primary key(username));

insert into mailinglist values ('Random', 'random@gmails.com');
insert into mailinglist values ('Man', 'man@gmails.com');
insert into mailinglist values ('This', 'this@gmails.com');
insert into mailinglist values ('Admin', 'admin@fakecompany.com');

insert into testimonial values ('“It is just brilliant. I will recommend it to everyone I know!', 1);
insert into testimonial values ('“ a’m really glad these guys got out there. I have bought it and now I think perhaps I should have invested!”
', 2);
insert into testimonial values ('"Wow! That says it all really."', 3);
insert into testimonial values ('“What a product! Why didnt someone think of it sooner? "', 4);
insert into testimonial values ('“Get out there and buy it if you are a customer and stock it if you are a retailer...you would be mad not to!"', 5);

insert into login values ('admin', 'admin');