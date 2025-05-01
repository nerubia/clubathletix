const posts = [
    {
      id: 1,
      title: 'Pre-schoolers / Kindergarten',
      href: '#',
      description:
        'Soccer training at this level is all about fun, movement, and basic coordination — not competition or tactics. At this age, the goal is to ignite interest and build fundamental motor skills, not to teach structured soccer.',
      imageUrl:
        '/clubs/pfa/toddler-boy.jpg',
      age_group: 'Ages 4-6',
      coach: {
        name: 'Khartik • Alisha D.',
        role: 'Co-coaches',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 2,
      title: 'Elementary',
      href: '#',
      description:
        'Coaches focus on building foundational skills in a fun, inclusive, and developmentally appropriate way.  Dribbling with both feet, short passes, receiving and controlling the ball from teammates, tag-based drills while focusing on effort, not just results.',
      imageUrl:
        '/clubs/pfa/mom-looking.jpg',
      age_group: 'Ages 7-11',
      
      coach: {
        name: 'Rohan S. • Joseph L.',
        role: 'Co-coaches',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 3,
      title: 'Youth',
      href: '#',
      description:
        'For youth ages 12 and above, soccer training becomes more structured and development-focused, bridging the gap between foundation and competition. This is the age when players begin to refine technique, understand tactics, and develop physical and mental discipline',
      imageUrl:
        '/clubs/pfa/girls-team.jpg',
      age_group: 'Ages 12-16',
      
      coach: {
        name: 'Shaan S.',
        role: 'Head Coach',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // More posts...
  ]
  
  export default function AgeGroups() {
    return (
      
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
              {posts.map((post) => (
                <article key={post.id} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                    <img
                      alt=""
                      src={post.imageUrl}
                      className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="text-gray-500">
                        {post.age_group}
                      </span>
                    </div>
                    <div className="group relative max-w-xl">
                      <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 text-sm/6 text-gray-600">{post.description}</p>
                    </div>
                    <div className="mt-6 flex border-t border-gray-900/5 pt-6">
                      <div className="relative flex items-center gap-x-4">
                        {/* <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" /> */}
                        <div className="text-sm/6">
                          <p className="font-semibold text-gray-900">
                            
                              <span className="absolute inset-0" />
                              {post.coach.name}
                            
                          </p>
                          <p className="text-gray-600">{post.coach.role}</p>
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
  