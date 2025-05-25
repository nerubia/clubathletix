import { getOrganizationByDomain } from '@/services/organization'
import { headers } from 'next/headers'
import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default async function Icon() {
    const hdr = await headers()
    const host = hdr.get('host') || 'localhost'
    const o = await getOrganizationByDomain(host)
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: `${size.height}px ${size.width}px`,
          justifyContent: 'center',
          color: 'white',
          ...(o.logo_url ? {
            backgroundImage: `url(${o.logo_url.split('/').reverse().slice(1).reverse().join('/') + '/favicon.png'})`
          }: {})
        }}
      />
        
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}