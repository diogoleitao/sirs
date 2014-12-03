DROP TABLE if exists testimonial;
DROP TABLE if exists mailinglist;
DROP TABLE if exists login;

create table testimonial
   (test        varchar(255)    not null,
    id          integer(2)    not null auto_increment,
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

insert into testimonial (test) values ('“It is just brilliant. I will recommend it to everyone I know!');
insert into testimonial (test) values ('“ I am really glad these guys got out there. I have bought it and now I think perhaps I should have invested!”
');
insert into testimonial (test) values ('"Wow! That says it all really."');
insert into testimonial (test) values ('“What a product! Why didnt someone think of it sooner?"');
insert into testimonial (test) values ('“Get out there and buy it if you are a customer and stock it if you are a retailer...you would be mad not to!"');

insert into login values ('admin', 'admin');
