import { type ErrorResponse } from '@remix-run/node'
import { isRouteErrorResponse, Link, useRouteError } from '@remix-run/react'
import { Icon } from './icon'

export default function DefaultErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return <CatchBoundary caught={error} />
  }

  const { message, stack } = error as Error

  return (
    <>
      <div className="container prose p-8">
        <h1 className="font-bolder mb-1 inline-flex items-center gap-4 text-2xl">
          <Icon name="exclamation-circle" className="h-8 w-8" />
        </h1>
        <h1 className="font-bolder mb-1 inline-flex items-center gap-4 text-2xl">
          {message || 'App Error'}
        </h1>
        <p className="mb-1 text-lg">
          An error has occurred processing your request. You may try again or
          contact support if the problem persists.
        </p>
      </div>
      {stack && (
        <div className="my-4 w-[95%] bg-white p-4 text-black">
          <pre className="max-w-full overflow-auto ">{stack}</pre>
          <p className="mt-4 italic text-red-500">
            Stack trace only displayed in DEVELOPMENT
          </p>
        </div>
      )}
    </>
  )
}

function CatchBoundary({ caught }: { caught: ErrorResponse }) {
  let message: string
  let data: any = {}

  if (typeof caught.data === 'string') {
    message = caught.data
  } else {
    data = caught.data
    message = data.message
  }

  switch (caught.status) {
    case 400:
      return <BadRequest message={message} data={data} />
    case 401:
      return <Unauthorized message={message} data={data} />
    case 403:
      return <Forbidden message={message} data={data} />
    case 404:
      return <NotFound message={message} data={data} />
    case 405:
      return <Invalid message={message} data={data} />
    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status} ${caught.data}}`,
      )
  }
}

function Unauthorized({ message, data }: { message: string; data: any }) {
  return (
    <div className="container prose p-8">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-purple-900">
        <Icon name="minus-circle" className="h-8 w-8" />
      </h1>
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-purple-900">
        {message || 'Unauthorized'}
      </h1>
      <p className="mb-1 text-lg">
        You must be logged into access this page. Click{' '}
        <Link to="/login">here</Link> to login.
      </p>
    </div>
  )
}

function BadRequest({
  message,
  data,
}: {
  message: string
  data?: { errors: string[] }
}) {
  return (
    <div className="container prose p-8">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl">
        <Icon name="exclamation-triangle" className="h-8 w-8" />
      </h1>
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl">
        {message || 'Bad Request'}
      </h1>
      <p className="mb-1 text-lg">
        You made an invalid request. The following errors have occurred.
      </p>
      {data?.errors && (
        <ul className="ml-4 list-disc">
          {data.errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Invalid({ message, data }: { message: string; data: any }) {
  return (
    <div className="container prose p-8">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl">
        <Icon name="exclamation-triangle" className="h-8 w-8" />
      </h1>
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl">
        {message || 'Invalid'}
      </h1>
      <p className="mb-1 text-lg">You made an invalid request.</p>
    </div>
  )
}

function Forbidden({ message, data }: { message: string; data: any }) {
  return (
    <div className="container prose p-8">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl">
        <Icon name="shield-exclamation" className="h-8 w-8" />
      </h1>
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl">
        {message || 'Not Authorized'}
      </h1>
      <p className="mb-1 text-lg">
        You are not authorized to access this page.
      </p>
    </div>
  )
}

function NotFound({ message, data }: { message: string; data: any }) {
  return (
    <div className="container prose p-8">
      <h1 className="font-bolder mb-3 inline-flex items-center gap-2 text-2xl">
        <Icon name="magnifying-glass" className="h-8 w-8" />
      </h1>
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl">
        {message || 'Not Found'}
      </h1>
      <p className="mb-1 text-lg">
        The page you were looking for could not be found.
      </p>
    </div>
  )
}
