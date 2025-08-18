import { LoginForm } from '@/components/auth/LoginForm'
import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <div className="flex min-h-screen justify-center bg-background pt-20">
      <div className="w-full max-w-md space-y-8 mx-4 md:mx-0">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
} 