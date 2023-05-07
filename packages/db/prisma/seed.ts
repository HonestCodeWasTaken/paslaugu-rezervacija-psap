import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add seed data for User
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  });

  // Add seed data for Business
  const business = await prisma.business.create({
    data: {
      name: "John's Café",
      description: "A cozy café located in the heart of the city.",
      main_image_url: "https://example.com/image.jpg",
      phoneNumber: "+1234567890",
      email: "johnscafe@example.com",
      user: {
        connect: {
          email: "john@example.com",
        },
      },
    },
  });

  // Add seed data for Category
  const category = await prisma.category.create({
    data: {
      name: "Food & Beverage",
    },
  });

  // Add seed data for Service
  await prisma.service.create({
    data: {
      service_name: "Coffee",
      description: "Aromatic coffee served in a cozy environment.",
      cost: 3.5,
      session_length: "15 minutes",
      business: {
        connect: {
          id: business.id,
        },
      },
      category: {
        connect: {
          id: category.id,
        },
      },
    },
  });

  // Add seed data for other models as needed
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
