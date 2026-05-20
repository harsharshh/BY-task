import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: { name: "Admin" },
  });

  const editor = await prisma.role.upsert({
    where: { name: "Editor" },
    update: {},
    create: { name: "Editor" },
  });

  const viewer = await prisma.role.upsert({
    where: { name: "Viewer" },
    update: {},
    create: { name: "Viewer" },
  });

  const users = [
    { name: "Alice Johnson", email: "alice@example.com", roleId: admin.id },
    { name: "Bob Smith", email: "bob@example.com", roleId: editor.id },
    { name: "Carol Davis", email: "carol@example.com", roleId: viewer.id },
    { name: "David Wilson", email: "david@example.com", roleId: admin.id },
    { name: "Eva Martinez", email: "eva@example.com", roleId: editor.id },
    { name: "Frank Lee", email: "frank@example.com", roleId: viewer.id },
    { name: "Grace Kim", email: "grace@example.com", roleId: editor.id },
    { name: "Henry Brown", email: "henry@example.com", roleId: viewer.id },
    { name: "Ivy Taylor", email: "ivy@example.com", roleId: admin.id },
    { name: "Jack Anderson", email: "jack@example.com", roleId: viewer.id },
    { name: "Kate Thomas", email: "kate@example.com", roleId: editor.id },
    { name: "Leo Garcia", email: "leo@example.com", roleId: viewer.id },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, roleId: user.roleId },
      create: user,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
