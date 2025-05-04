export type Program = {
  id: number
  name: string
  description: string
  min_age: number
  max_age: number
  coaches: string[]
  is_active?: boolean
  image_url?: string
}

export default function AgeGroups({groups}: {
  groups: Program[]
}) {

  function getImage(min_age: number) {
    if (min_age < 6) return '/clubs/pfa/toddler-boy.jpg'
    else if (min_age < 12) return '/clubs/pfa/mom-looking.jpg'
    return '/clubs/pfa/girls-team.jpg'
  }

    return (
      
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="space-y-20">
              {groups.map((item) => (
                <article key={item.name} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-1/2 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      alt=""
                      src={getImage(item.min_age)}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="text-gray-500">
                        Ages {[item.min_age, item.max_age].filter(Boolean).join('-')}
                      </span>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        {item.name}
                      </h3>
                      <p className="mt-5 text-sm/6 text-gray-600">{item.description}</p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        {/* <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" /> */}
                        <div className="text-sm/6">
                          <p className="font-semibold text-gray-900">
                            
                              <span className="absolute inset-0" />
                              {item.coaches.join(' • ')}
                            
                          </p>
                          <p className="text-gray-600">{item.coaches.length > 1 ? 'Co-coaches' : 'Coach'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
    )
  }
  