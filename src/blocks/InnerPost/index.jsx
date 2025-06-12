import React from 'react'
import { Client } from './client.jsx'

export async function InnerPost({ block, locale }) {
  return <Client block={block} locale={locale} />
}
