/* eslint-disable prettier/prettier */
const { PrismaClient } = require('@prisma/client');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();


async function seedUser() {

  await prisma.user.create({
    data: {
      email: 'nvsang2670@gmail.com',
      fullName: 'Nguyễn Văn Sang',
      username: 'diepminh2670',
      phone: '0386237067',
      password: bcrypt.hashSync('Sang2607200209@', 10),
      role: 'ADMIN',
    },
  });


}

async function main() {
  return Promise.all([seedUser()]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
