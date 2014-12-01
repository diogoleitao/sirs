drop table testimonial if exists
drop table email if exists

create table testimonial
   (test        varchar(255)    not null,
    id    numeric(2,0)  not null unique , --auto-increment?
    primary key(id));

create table mailinglist
   (email       varchar(100) not null unique,
    primary key(email));

insert into mailinglist values ("random@gmails.com");
insert into mailinglist values ("man@gmails.com");
insert into mailinglist values ("this@gmails.com");
insert into mailinglist values ("admin@fakecompany.com");

insert into testimonial values ('“It’s just brilliant. I will recommend it to everyone I know!', 1);
insert into testimonial values ('“I’m really glad these guys got out there. I’ve bought it and now I think perhaps I should have invested!”
', 2);
insert into testimonial values ('"Wow! That says it all really."',3 );
insert into testimonial values ('“What a product! Why didn’t someone think of it sooner? ★★★★★ "', 4);
insert into testimonial values ('“Get out there and buy it if you’re a customer and stock it if you’re a retailer – you’d be mad not to!"',5 );

