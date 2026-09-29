import React, { createContext, useContext } from 'react'
import { useParams } from 'react-router-dom'

/**
 * Route params for the static render.
 *
 * During the SSG pass the app is rendered with a bare StaticRouter, which has
 * no route table to match against, so useParams() comes back empty. Params are
 * therefore also passed through this context, and useRouteParams() merges the
 * two. On the client the context is empty and useParams() does the work, so
 * pages behave identically in both environments.
 */
export const RouteParamsContext = createContext({})

export function useRouteParams() {
  const fromContext = useContext(RouteParamsContext) || {}
  const fromRouter = useParams()
  return { ...fromRouter, ...fromContext }
}
