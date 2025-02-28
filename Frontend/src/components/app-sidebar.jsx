import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url:"",
      isActive:true
    },
    {
      title: "Blogs",
      url: "/blog",
      icon: SquareTerminal,
      items: [
        {
          title: "All Blogs",
          url: "/admin/blogs",
        },
        {
          title: "Add Blogs",
          url: "#",
        },
        {
          title: "Category",
          url: "/admin/Blog-Category",
        },
        {
          title: "Tags",
          url: "#",
        }
      ],
    },
    {
      title: "Property",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Property",
          url: "#",
        },
        {
          title: "Add Property",
          url: "#",
        },
        {
          title: "Property Types",
          url: "#",
        },
        {
          title: "Property labels",
          url: "#",
        },
        {
          title: "Property Features",
          url: "#",
        },
        {
          title: "Property status",
          url: "#",
        },
        {
          title: "Countries",
          url: "#",
        },
        {
          title: "States",
          url: "#",
        },
        {
          title: "Cities",
          url: "#",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: BookOpen
    },
    {
      title: "Agents",
      url: "#",
      icon: Settings2
    },
    {
      title:"CRM",
      url:"",
      items:[
        {
          title:"Property Enquiries",
          url:""
        },
        {
          title:"Contact Enquiries",
          url:""
        }
      ]
    },
    {
      title:"Settings",
      url:"",
      items:[
        {
          title:"FAQs",
          url:""
        },
        {
          title:"Contact Page",
          url:""
        },
        {
          title:"Sections",
          url:""
        },
        {
          title:"Header",
          url:""
        },
        {
          title:"Footer ",
          url:""
        },
      ]
    }
  ],

}

export default function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
