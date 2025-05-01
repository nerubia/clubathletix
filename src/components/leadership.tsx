const people = [
    {
      name: 'Coach Shaan',
      role: 'PF Co-founder & Technical Director',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: `Born in India and raised in Prince Rupert, Shaan found his love for soccer after moving to the Lower Mainland at age 15. Though a late starter, he quickly stood out—helping his high school reach provincials for the first time in 22 years.

He went on to play in the BCSPL with Coastal FC and Coquitlam Metro-Ford, and since 2019, he’s found his home with SFC as both a player and coach.

Shaan is also an Educational Assistant with the Surrey School Board, working with children with special needs. His passion for youth development drives his coaching—focused on helping kids grow on and off the pitch. With firsthand experience in reaching competitive levels, Shaan is committed to guiding young players toward their next step, whether it’s Div 1, BCSPL, or beyond.`,
    },
    {
      name: 'Rey',
      role: 'PF Co-founder & VP Operations',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      bio: `Rey is the creative mind behind the academy’s social media and daily operations. As a Social Media Manager and Creative Director, he uses both strategy and storytelling from the perspective of a soccer dad to help the academy connect with its community in a meaningful way.

But his work doesn’t stop there. Rey also handles the behind-the-scenes tasks that keep everything running smoothly. He’s the go-to person for solving problems and organizing systems. Around the academy, he’s known as the "coaching parent" for his natural ability to connect with fellow soccer moms and dads to provide valuable insights and ideas to fellow parents.

Whether it’s helping a worried parent, managing the details behind the scenes and face to face, or sharing the academy’s story—Rey brings care, creativity, and calm to everything he does.`,
    },
    // More people...
  ]
  
  export default function LeadershipSection() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-0 sm:text-right">
            <h2 className="text-34l font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
              Meet our coaches
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Our coaches bring years of soccer expertise, a passion for the game, and a fun, engaging approach that makes every session exciting and rewarding.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none"
          >
            {people.map((person) => (
              <li key={person.name} className="flex flex-col gap-6 xl:flex-row">
                <img alt="" src={person.imageUrl} className="aspect-4/5 w-52 flex-none rounded-2xl object-cover" />
                <div className="flex-auto">
                  <h3 className="text-lg/8 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-base/7 text-gray-600">{person.role}</p>
                  <p className="mt-6 text-sm/5 text-gray-600 text-justify">{person.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  