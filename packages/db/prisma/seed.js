/* eslint-disable import/extensions */
import { PrismaClient } from "@prisma/client";

import { addresses, businesses, categories, services, users } from "./data.js";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.business.deleteMany();
    console.log("Deleted records in business table");

    // await prisma.instructor.deleteMany()
    console.log("Deleted records in instructor table");

    await prisma.user.deleteMany();
    console.log("Deleted records in user table");

    await prisma.business_Hours.deleteMany();
    console.log("Deleted records in business hours table");

    await prisma.address.deleteMany();
    console.log("Deleted records in address table");

    await prisma.rating.deleteMany();
    console.log("Deleted records in address table");

    // await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`
    // console.log('reset User auto increment to 1')

    // await prisma.$queryRaw`ALTER TABLE Instructor AUTO_INCREMENT = 1`
    // console.log('reset Instructor auto increment to 1')

    await prisma.$queryRaw`ALTER TABLE Business AUTO_INCREMENT = 1`;
    console.log("reset Business auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE Address AUTO_INCREMENT = 1`;
    console.log("reset address auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE Business_Hours AUTO_INCREMENT = 1`;
    console.log("reset Business_Hours auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE Rating AUTO_INCREMENT = 1`;
    console.log("reset Ratings auto increment to 1");

    await prisma.user.createMany({
      data: users,
    });
    console.log("Added user data");
    const usersFromDb = await prisma.user.findMany();
    await prisma.business.createMany({
      data: businesses.map((x, index) => ({
        ...x,
        user_id: usersFromDb[index].id,
      })),
    });
    console.log("Added business data with user ids");
    // await prisma.business_Hours.createMany({
    //   data: businessHours,
    // })

    await prisma.address.createMany({
      data: addresses,
    });
    console.log("Added address data");

    await prisma.category.createMany({
      data: categories,
    });
    console.log("Added category data");

    await prisma.service.createMany({
      data: services,
    });
    console.log("Added service data");
    // await prisma.rating.createMany({
    //   data: ratings,
    // })
    // console.log('Added ratings data')
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
