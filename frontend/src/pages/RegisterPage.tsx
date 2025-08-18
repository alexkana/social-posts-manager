import { RegisterForm } from '@/components/auth/RegisterForm'
import { Link } from 'react-router-dom'

export function RegisterPage() {
  return (
    <div className="flex min-h-screen justify-center pt-20">
      <div className="w-full max-w-md space-y-8 mx-4 md:mx-0">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
} 