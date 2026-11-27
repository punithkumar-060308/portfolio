/**
 * ============================================================================
 * TIMELINE MILESTONES DATA REPOSITORY & BLUEPRINT
 * ============================================================================
 *
 * HOW TO ADD A NEW MILESTONE:
 * ----------------------------------------------------------------------------
 * 1. Copy the `TIMELINE_TEMPLATE` below.
 * 2. Paste it into the `timelineData` array.
 * 3. Fill in:
 *    - `id`: Unique identifier (e.g. "my-milestone-title-2026")
 *    - `year`: Year string (e.g. "2026")
 *    - `month`: (Optional) Month string, e.g. "January", "Feb", "03", or ""
 *    - `title`: Milestone title
 *    - `description`: Milestone description
 * 4. Save the file. The timeline automatically places it chronologically
 *    by year and month along the continuous horizontal journey track.
 *
 * EXAMPLE BLUEPRINT TEMPLATE:
 * ----------------------------------------------------------------------------
 * {
 *   id: "unique-milestone-id",
 *   year: "2026",
 *   month: "", // Optional, e.g. "January", "March", "08"
 *   title: "Your Milestone Title",
 *   description: "Detailed description of your achievement or learning milestone."
 * }
 * ============================================================================
 */

export interface TimelineMilestone {
  id: string;
  year: string;
  month?: string; // Optional: e.g. "January", "Feb", "03", "Apr"
  title: string;
  description: string;
}

const MONTH_MAP: Record<string, number> = {
  january: 1, jan: 1, "01": 1, "1": 1,
  february: 2, feb: 2, "02": 2, "2": 2,
  march: 3, mar: 3, "03": 3, "3": 3,
  april: 4, apr: 4, "04": 4, "4": 4,
  may: 5, "05": 5, "5": 5,
  june: 6, jun: 6, "06": 6, "6": 6,
  july: 7, jul: 7, "07": 7, "7": 7,
  august: 8, aug: 8, "08": 8, "8": 8,
  september: 9, sep: 9, sept: 9, "09": 9, "9": 9,
  october: 10, oct: 10, "10": 10,
  november: 11, nov: 11, "11": 11,
  december: 12, dec: 12, "12": 12,
};

/**
 * Automatically sorts milestones chronologically by Year, then by Month.
 * Milestones without months preserve their registered order.
 */
export const getSortedTimeline = (
  milestones: TimelineMilestone[] = timelineData
): TimelineMilestone[] => {
  return [...milestones].sort((a, b) => {
    const yearDiff = parseInt(a.year, 10) - parseInt(b.year, 10);
    if (!isNaN(yearDiff) && yearDiff !== 0) return yearDiff;

    const monthA = a.month ? MONTH_MAP[a.month.toLowerCase().trim()] || 0 : 0;
    const monthB = b.month ? MONTH_MAP[b.month.toLowerCase().trim()] || 0 : 0;
    return monthA - monthB;
  });
};

export const timelineData: TimelineMilestone[] = [
  {
    id: "started-engineering-2025",
    year: "2025",
    month: "",
    title: "Started Engineering",
    description: "Joined B.E AI & ML at BMS College of Engineering, Bangalore – fell in love with CS fundamentals."
  },
  {
    id: "first-program-2025",
    year: "2025",
    month: "",
    title: "First Program",
    description: "Wrote my first C program. It printed 'Hello World' and I was hooked."
  },
  {
    id: "python-journey-begins-2026",
    year: "2026",
    month: "",
    title: "Python Journey Begins",
    description: "Built my first Python script – a small calculator that sparked my interest in coding."
  },
  {
    id: "acm-club-tech-team-2026",
    year: "2026",
    month: "",
    title: "ACM Club Tech Team",
    description: "Selected as a Tech Team Member of the ACM Club, contributing to projects and events."
  },
  {
    id: "web-development-2026",
    year: "2026",
    month: "",
    title: "Web Development",
    description: "Took my first steps into web development, learning the basics of how websites work."
  },
  {
    id: "built-small-webpages-2026",
    year: "2026",
    month: "",
    title: "Built Small Webpages",
    description: "Created simple webpages using HTML and CSS, experimenting with layouts and styles."
  },
  {
    id: "open-source-explorer-2026",
    year: "2026",
    month: "",
    title: "Open Source Explorer",
    description: "Made my first GitHub commit. The journey continues..."
  },
  {
    id: "open-source-contribution-ecsoc-2026",
    year: "2026",
    month: "",
    title: "Open Source Contribution — ECSOC'26",
    description: "Started contributing to open source as part of ECSOC'26. Working on frontend development with the help of AI tools, building modern and interactive web interfaces."
  },
  {
    id: "started-leetcode-problem-solving-2026",
    year: "2026",
    month: "",
    title: "Started LeetCode Problem Solving",
    description: "Began solving DSA problems on LeetCode using Python – focusing on arrays, strings, and basic algorithms to sharpen problem-solving skills."
  }
];
