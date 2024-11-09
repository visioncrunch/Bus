import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const SideBar: React.FC = () => {
  return (
    <div className="w-[360px] hidden nhd:flex shrink-0 border-l px-10 py-7 flex-col h-fit">
      <StaffPicks />
      <RecommendedTopics />
      <WhoToFollow />
      <ReadingList />
      <Links />
    </div>
  );
};

const staffPicksData = [
  {
    id: 1,
    name: "Alice Johnson",
    topic: "Web Development",
    description: "Exploring new frontend frameworks.",
  },
  {
    id: 2,
    name: "Bob Smith",
    topic: "Data Science",
    description: "Analyzing big data trends.",
  },
  {
    id: 3,
    name: "Charlie Brown",
    topic: "AI Research",
    description: "The future of AI technology.",
  },
];

const StaffPicks: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3">Staff Picks</div>
    {staffPicksData.map((pick) => (
      <StaffPickItem key={pick.id} pick={pick} />
    ))}
    <div className="text-sm mb-5">See full list</div>
  </div>
);

const StaffPickItem: React.FC<{ pick: typeof staffPicksData[0] }> = ({ pick }) => (
  <div className="mb-4">
    <div className="flex text-xs items-center gap-2 mb-3 overflow-hidden">
      <Avatar className='size-5'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{pick.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="">{pick.name}</div>
      <div className="font-light">in</div>
      <div className="">{pick.topic}</div>
    </div>
    <div className="text-sm font-semibold">{pick.description}</div>
  </div>
);

const recommendedTopics = [
  "Web Development",
  "Data Science",
  "Artificial Intelligence",
  "Blockchain",
  "Cybersecurity",
];

const RecommendedTopics: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3">Recommended Topics</div>
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mb-5 overflow-hidden">
      {recommendedTopics.map((topic, index) => (
        <Button key={index} variant={"myButton"} className="text-xs">{topic}</Button>
      ))}
    </div>
    <div className="text-sm mb-5">See full list</div>
  </div>
);

const whoToFollowData = [
  {
    id: 1,
    name: "David Williams",
    bio: "Tech enthusiast and developer.",
  },
  {
    id: 2,
    name: "Emma Johnson",
    bio: "Passionate about UI/UX design.",
  },
  {
    id: 3,
    name: "Fiona Zhang",
    bio: "Advocate for open-source software.",
  },
];

const WhoToFollow: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3">Who to Follow</div>
    {whoToFollowData.map((user) => (
      <FollowItem key={user.id} user={user} />
    ))}
    <div className="text-sm">See full list</div>
  </div>
);

const FollowItem: React.FC<{ user: typeof whoToFollowData[0] }> = ({ user }) => (
  <div className="mb-4">
    <div className="flex text-xs items-center gap-2 mb-3 overflow-hidden">
      <Avatar className='size-5 self-start'>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="">{user.name}</div>
        <div className="font-light">{user.bio}</div>
      </div>
      <Button variant={"outline"}>Follow</Button>
    </div>
  </div>
);

const linksData = [
  "GitHub",
  "LinkedIn",
  "Twitter",
  "Dev.to",
  "Medium",
  "Stack Overflow",
  "CodePen",
  "Figma",
  "Dribbble",
  "Reddit",
];

const ReadingList: React.FC = () => (
  <div className="mb-5">
    <div className="mb-3 font-bold">Reading List</div>
    <div className="text-xs font-light">
      Click the <Save className="inline size-4" /> icon on any story to add it to your reading list or a custom list that you can share.
    </div>
  </div>
);

const Links: React.FC = () => (
  <div className="flex gap-2 flex-wrap">
    {linksData.map((link, index) => (
      <a key={index} href="#" className="text-xs hover:underline">{link}</a>
    ))}
  </div>
);

export default SideBar;
