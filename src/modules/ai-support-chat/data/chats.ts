export interface ChatMessage {
  id: string
  sender: 'customer' | 'ai'
  text: string
  timestamp: string
}

export interface ChatSession {
  id: string
  customerName: string
  subject: string
  status: 'active' | 'closed'
  date: string
  messages: ChatMessage[]
}

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.',
  'Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.',
]

export const chatSessions: ChatSession[] = [
  {
    id: 'chat-001',
    customerName: 'Sarah Johnson',
    subject: 'Cannot login to my account',
    status: 'active',
    date: '2026-03-24',
    messages: [
      { id: 'm1', sender: 'customer', text: "Hi, I can't seem to login to my account. I keep getting an 'invalid credentials' error even though I'm sure my password is correct.", timestamp: '2026-03-24T09:15:00' },
      { id: 'm2', sender: 'ai', text: lorem[0], timestamp: '2026-03-24T09:15:32' },
      { id: 'm3', sender: 'customer', text: "I've already tried resetting my password twice. The reset email comes through but after setting a new password I still can't login.", timestamp: '2026-03-24T09:16:10' },
      { id: 'm4', sender: 'ai', text: lorem[1], timestamp: '2026-03-24T09:16:45' },
      { id: 'm5', sender: 'customer', text: "Yes, I'm using the email sarah.j@example.com. Could there be an issue with my account specifically?", timestamp: '2026-03-24T09:17:20' },
      { id: 'm6', sender: 'ai', text: lorem[2], timestamp: '2026-03-24T09:17:55' },
    ],
  },
  {
    id: 'chat-002',
    customerName: 'Michael Chen',
    subject: 'Billing question about subscription',
    status: 'closed',
    date: '2026-03-23',
    messages: [
      { id: 'm1', sender: 'customer', text: "I was charged twice for my monthly subscription this month. Can you help me with a refund?", timestamp: '2026-03-23T14:00:00' },
      { id: 'm2', sender: 'ai', text: lorem[3], timestamp: '2026-03-23T14:00:35' },
      { id: 'm3', sender: 'customer', text: "My account ID is MC-4521. The double charge happened on March 20th.", timestamp: '2026-03-23T14:01:15' },
      { id: 'm4', sender: 'ai', text: lorem[4], timestamp: '2026-03-23T14:01:50' },
    ],
  },
  {
    id: 'chat-003',
    customerName: 'Emily Rodriguez',
    subject: 'How do I export my data?',
    status: 'closed',
    date: '2026-03-22',
    messages: [
      { id: 'm1', sender: 'customer', text: "I need to export all my project data as a CSV file. Where can I find the export option?", timestamp: '2026-03-22T11:30:00' },
      { id: 'm2', sender: 'ai', text: lorem[5], timestamp: '2026-03-22T11:30:30' },
      { id: 'm3', sender: 'customer', text: "Found it, thanks! One more question — is there a way to schedule automatic exports weekly?", timestamp: '2026-03-22T11:31:45' },
      { id: 'm4', sender: 'ai', text: lorem[0], timestamp: '2026-03-22T11:32:20' },
      { id: 'm5', sender: 'customer', text: "That would be great. I'll submit a feature request. Thanks for the help!", timestamp: '2026-03-22T11:33:00' },
      { id: 'm6', sender: 'ai', text: lorem[1], timestamp: '2026-03-22T11:33:30' },
    ],
  },
  {
    id: 'chat-004',
    customerName: 'David Kim',
    subject: 'Feature request: dark mode',
    status: 'closed',
    date: '2026-03-21',
    messages: [
      { id: 'm1', sender: 'customer', text: "Any plans to add a dark mode? I work late hours and the bright interface is hard on my eyes.", timestamp: '2026-03-21T22:10:00' },
      { id: 'm2', sender: 'ai', text: lorem[2], timestamp: '2026-03-21T22:10:35' },
      { id: 'm3', sender: 'customer', text: "Great to hear it's on the roadmap. Is there a beta I could try in the meantime?", timestamp: '2026-03-21T22:11:20' },
      { id: 'm4', sender: 'ai', text: lorem[3], timestamp: '2026-03-21T22:11:55' },
    ],
  },
  {
    id: 'chat-005',
    customerName: 'Lisa Wang',
    subject: 'App crashes on startup',
    status: 'active',
    date: '2026-03-24',
    messages: [
      { id: 'm1', sender: 'customer', text: "The mobile app crashes immediately after the splash screen. I'm on iOS 19.2. This started after the latest update.", timestamp: '2026-03-24T08:00:00' },
      { id: 'm2', sender: 'ai', text: lorem[4], timestamp: '2026-03-24T08:00:30' },
      { id: 'm3', sender: 'customer', text: "I've tried reinstalling and restarting my phone. Neither worked. Here's my device info: iPhone 16 Pro, 512GB, plenty of storage.", timestamp: '2026-03-24T08:01:45' },
      { id: 'm4', sender: 'ai', text: lorem[5], timestamp: '2026-03-24T08:02:20' },
      { id: 'm5', sender: 'customer', text: "How long until this is fixed? I rely on this app for work daily.", timestamp: '2026-03-24T08:03:00' },
      { id: 'm6', sender: 'ai', text: lorem[0], timestamp: '2026-03-24T08:03:35' },
      { id: 'm7', sender: 'customer', text: "Ok, I'll use the web version for now. Please keep me updated.", timestamp: '2026-03-24T08:04:10' },
      { id: 'm8', sender: 'ai', text: lorem[1], timestamp: '2026-03-24T08:04:45' },
    ],
  },
  {
    id: 'chat-006',
    customerName: 'James Patel',
    subject: 'Integration with Slack not working',
    status: 'closed',
    date: '2026-03-20',
    messages: [
      { id: 'm1', sender: 'customer', text: "I connected my Slack workspace but notifications aren't coming through. The integration shows as 'connected' in settings.", timestamp: '2026-03-20T16:45:00' },
      { id: 'm2', sender: 'ai', text: lorem[2], timestamp: '2026-03-20T16:45:35' },
      { id: 'm3', sender: 'customer', text: "I've checked the channel permissions and everything looks correct. The bot is in the channel.", timestamp: '2026-03-20T16:46:30' },
      { id: 'm4', sender: 'ai', text: lorem[3], timestamp: '2026-03-20T16:47:05' },
      { id: 'm5', sender: 'customer', text: "Reconnecting fixed it! Thanks for the quick help.", timestamp: '2026-03-20T16:50:00' },
      { id: 'm6', sender: 'ai', text: lorem[4], timestamp: '2026-03-20T16:50:30' },
    ],
  },
  {
    id: 'chat-007',
    customerName: 'Anna Müller',
    subject: 'Cannot upload files larger than 10MB',
    status: 'closed',
    date: '2026-03-19',
    messages: [
      { id: 'm1', sender: 'customer', text: "I'm trying to upload a 25MB PDF but I keep getting a file size error. My plan should allow up to 100MB uploads.", timestamp: '2026-03-19T10:20:00' },
      { id: 'm2', sender: 'ai', text: lorem[5], timestamp: '2026-03-19T10:20:35' },
      { id: 'm3', sender: 'customer', text: "I'm on the Business plan. Account ID is AM-7803.", timestamp: '2026-03-19T10:21:20' },
      { id: 'm4', sender: 'ai', text: lorem[0], timestamp: '2026-03-19T10:21:55' },
    ],
  },
  {
    id: 'chat-008',
    customerName: 'Robert Taylor',
    subject: 'How to add team members',
    status: 'closed',
    date: '2026-03-18',
    messages: [
      { id: 'm1', sender: 'customer', text: "I just upgraded to the Team plan. How do I invite my colleagues to the workspace?", timestamp: '2026-03-18T13:00:00' },
      { id: 'm2', sender: 'ai', text: lorem[1], timestamp: '2026-03-18T13:00:35' },
      { id: 'm3', sender: 'customer', text: "Found the invite option under Settings > Team. But can I set different permission levels for different members?", timestamp: '2026-03-18T13:01:40' },
      { id: 'm4', sender: 'ai', text: lorem[2], timestamp: '2026-03-18T13:02:15' },
      { id: 'm5', sender: 'customer', text: "Perfect, that's exactly what I needed. Thanks!", timestamp: '2026-03-18T13:03:00' },
      { id: 'm6', sender: 'ai', text: lorem[3], timestamp: '2026-03-18T13:03:30' },
    ],
  },
]
