import { Gender, Role } from "@prisma/client";

export const users = [
  {
    id: "clda8opbg0000sjx3qa3wbh1s",
    given_name: "Edvinas",
    family_name: "Milašauskas",
    email: "cneary0@nasa.gov",
    gender: Gender.MALE,
    password:
      "91d822aea31c215b22d5a5e5bf60fcc3c62fce0a24c1174bcbc9225526f44a37",
    date_of_birth: new Date("2021-12-29 10:59:33"),
    created: new Date("2022-03-05 04:10:55"),
    modified: new Date("2022-08-03 21:44:26"),
    role: Role.BUSINESS_OWNER,
    image: "http://dummyimage.com/195x100.png/ff4444/ffffff",
  },
  {
    id: "clda8opbh0001sjx30vvgdxod",
    given_name: "Donnajean",
    family_name: "Baston",
    email: "dbaston1@si.edu",
    gender: Gender.FEMALE,
    password:
      "3caa74e002628c8799af3427ee534eefc8de251b33b4e188480ef41082a5175d",
    date_of_birth: new Date("2022-02-07 09:33:38"),
    created: new Date("2021-12-22 10:53:04"),
    modified: new Date("2022-04-18 05:30:41"),
    role: Role.CLIENT,
    image: "http://dummyimage.com/227x100.png/dddddd/000000",
  },
  {
    given_name: "Padriac",
    family_name: "Foss",
    email: "pfoss2@w3.org",
    gender: Gender.MALE,
    password:
      "bfd333b2d5136075ab1d72dc3ecc0f2b1fd23b901a9e9b32ecc492e3d1d1404e",
    date_of_birth: new Date("2022-03-23 23:28:01"),
    created: new Date("2022-04-14 14:39:47"),
    modified: new Date("2022-04-07 19:14:31"),
    role: Role.CLIENT,
    image: "http://dummyimage.com/184x100.png/cc0000/ffffff",
  },
];
export const businesses = [
  {
    name: "eina nx",
    description: "BLAH BLAH BLAH BLAH",
    main_image_url:
      "https://www.techlifetoday.ca/TechlifeToday/media/techlife-media/personal-trainer-2.jpg",
    user_id: "clda8opbg0000sjx3qa3wbh1s",
  },
  {
    name: "bro",
    description: "BLAH BLAH BLAH BLAH",
    main_image_url:
      "https://www.techlifetoday.ca/TechlifeToday/media/techlife-media/personal-trainer-1.jpg",
    user_id: "clda8opbh0001sjx30vvgdxod",
  },
];
export const addresses = [
  {
    postal_code: "55555",
    country: "LT",
    city: "Vilnius",
    street_name: "Jono g.",
    street_number: 20,
    coordinates: "54.8894016,23.9252511",
    business_id: 2,
  },
  // {
  //   postal_code: '55555',
  //   country: 'LT',
  //   city: 'Vilnius',
  //   street_name: 'Baltų g.',
  //   street_number: 10,
  //   coordinates: '54.8894000,23.9252510',
  //   business_id: 2,
  // },
];
export const businessHours = [
  {
    business_id: 1,
    day: 1,
    open_time: "09:00",
    closing_time: "18:00",
  },
  {
    business_id: 1,
    day: 2,
    open_time: "09:00",
    closing_time: "18:00",
  },
  {
    business_id: 1,
    day: 3,
    open_time: "09:00",
    closing_time: "18:00",
  },
];
export const services = [
  {
    service_name: "Muay Thai sparring",
    description: "LOL",
    cost: 19.99,
    session_length: "1:30",
    business_id: 1,
    category_id: 1,
  },
];
