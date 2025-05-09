import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Heading, FileText } from 'lucide-react'
import { createPost } from '@/services/postService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CreatePostPayload } from '@/types/post'
import * as yup from 'yup'

// Define validation schema
const createPostSchema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  content: yup.string().required('Content is required').min(10, 'Content must be at least 10 characters'),
}).required()

export function CreatePostForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const form = useForm<CreatePostPayload>({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  // Create post mutation using React Query
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Reset the form
      form.reset()
      
      // Invalidate and refetch posts queries to show the new post
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      
      // Optionally scroll to the top or navigate to the posts page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })

  const onSubmit = async (data: CreatePostPayload) => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      // Call the API to create the post
      await createPostMutation.mutateAsync(data)
      
      // Redirect to posts page on success
      navigate('/posts')
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl bg-white shadow-lg border border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-900">Create New Post</CardTitle>
        <CardDescription className="text-gray-600">Share your thoughts with the world</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                    <Heading className="h-4 w-4 text-blue-600" />
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter post title" 
                      className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                    <FileText className="h-4 w-4 text-blue-600" />
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your post content here..." 
                      className="min-h-[150px] bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            
            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">{error}</div>
            )}
            
            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || createPostMutation.isPending}
              >
                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="border-gray-300 hover:bg-gray-50"
                onClick={() => navigate('/posts')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 