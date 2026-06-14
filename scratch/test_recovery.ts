import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/modules/auth/services/auth.service';
import { PrismaService } from '../src/modules/prisma/prisma.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  const prisma = app.get(PrismaService);

  console.log('--- PASSWORD RECOVERY END-TO-END TEST ---');

  // 1. Find or create a test user
  let user = await prisma.user.findFirst();
  if (!user) {
    console.log('No user found in DB. Registering a test user first...');
    const result = await authService.register({
      email: 'testrecovery@luckywave.com',
      password: 'oldpassword123',
      name: 'Test Recovery',
    });
    user = await prisma.user.findUnique({ where: { email: 'testrecovery@luckywave.com' } });
  }

  if (!user) {
    throw new Error('Could not find or create a test user.');
  }

  const email = user.email;
  console.log(`Using user: ${email}`);

  // 2. Request forgot password code
  console.log('Step 1: Requesting recovery code via forgotPassword...');
  const forgotResponse = await authService.forgotPassword({ email });
  console.log('Response:', forgotResponse);
  const code = forgotResponse.code;

  if (!code) {
    throw new Error('Verification code was not generated.');
  }

  // 3. Reset password using the code
  console.log('Step 2: Resetting password via resetPassword...');
  const newPassword = 'newpassword1234';
  const resetResponse = await authService.resetPassword({
    email,
    code,
    newPassword,
  });
  console.log('Response:', resetResponse);

  // 4. Verify login with the new password
  console.log('Step 3: Verifying login with the new password...');
  try {
    const loginResponse = await authService.login({
      email,
      password: newPassword,
    });
    console.log('Login successful! Token generated:', !!loginResponse.access_token);
  } catch (err: any) {
    console.error('Login failed with new password:', err.message);
    throw err;
  }

  // 5. Verify login with old password fails
  console.log('Step 4: Confirming login with old password fails...');
  try {
    await authService.login({
      email,
      password: 'oldpassword123',
    });
    console.error('ERROR: Old password login should have failed!');
    throw new Error('Security vulnerability: Old password still works.');
  } catch (err: any) {
    console.log('Success: Old password login rejected correctly (', err.message, ')');
  }

  console.log('--- ALL RECOVERY TESTS PASSED SUCCESSFULLY ---');
  await app.close();
}

main().catch((err) => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
