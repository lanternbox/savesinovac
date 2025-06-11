import React from 'react'
import { Client } from './client.jsx'

export async function Navbar({ block, locale }) {
  return <Client block={block} locale={locale} />
}
