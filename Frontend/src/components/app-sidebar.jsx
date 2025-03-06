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
import path from "path"
import { title } from "process"

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
          url: "/admin/blogs/blog-Category",
        },
        {
          title: "Tags",
          url: "/admin/blogs/blog-tag",
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
          url: "/admin/property",
        },
        {
          title: "Add Property",
          url: "/admin/property/add-property",
        },
        {
          title: "Property Types",
          url: "/admin/property/property-types",
        },
        {
          title: "Property labels",
          url: "/admin/property/property-label",
        },
        {
          title: "Property Features",
          url: "/admin/property/property-features",
        },
        {
          title: "Property status",
          url: "/admin/property/property-status",
        },
        {
          title: "Countries",
          url: "/admin/property/country",
        },
        {
          title: "States",
          url: "/admin/property/state",
        },
        {
          title: "Cities",
          url: "/admin/property/city",
        },
      ],
    },
    {
      title: "Projects",
      url: "/admnin/projects",
      icon: BookOpen,
      items: [
        {
          title: "All Projects",
          url: "/admin/projects",
        },
      ],
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
