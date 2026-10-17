/**
 * Utility to fetch and synchronize live competitive programming stats
 * Platforms: LeetCode, Codeforces, CodeChef, AtCoder
 */

export const CODING_HANDLES = {
  leetcode: {
    username: "harshmishra5554",
    url: "https://leetcode.com/u/harshmishra5554/"
  },
  codeforces: {
    username: "Harsh_mishra5554",
    url: "https://codeforces.com/profile/Harsh_mishra5554"
  },
  codechef: {
    username: "harshmishra555",
    url: "https://www.codechef.com/users/harshmishra555"
  },
  atcoder: {
    username: "harshmishra555",
    url: "https://atcoder.jp/users/harshmishra555"
  }
};

const STATS_CACHE_KEY = "harsh_live_coding_stats_v1";

export const initialCodingStats = {
  lastUpdated: null,
  isLive: false,
  totalProblemsSolved: 865,
  platforms: {
    leetcode: {
      platform: "LeetCode",
      handle: CODING_HANDLES.leetcode.username,
      url: CODING_HANDLES.leetcode.url,
      totalSolved: 102,
      easy: 47,
      medium: 45,
      hard: 10,
      ranking: "Top Problem Solver",
      recentSubmissions: [
        { title: "Lemonade Change", lang: "C++", status: "Accepted" },
        { title: "Jump Game II", lang: "C++", status: "Accepted" },
        { title: "Container With Most Water", lang: "C++", status: "Accepted" },
        { title: "Array Partition", lang: "C++", status: "Accepted" },
        { title: "Assign Cookies", lang: "C++", status: "Accepted" }
      ]
    },
    codeforces: {
      platform: "Codeforces",
      handle: CODING_HANDLES.codeforces.username,
      url: CODING_HANDLES.codeforces.url,
      rating: 1050,
      maxRating: 1149,
      rank: "Newbie",
      solvedCount: 354,
      organization: "IET Lucknow",
      recentSubmissions: [
        { title: "Problem 2042A - Greed", verdict: "OK" },
        { title: "Problem 2038N - Fixing the Expression", verdict: "OK" },
        { title: "Problem 2037C - Superultra's Favorite Permutation", verdict: "OK" }
      ]
    },
    codechef: {
      platform: "CodeChef",
      handle: CODING_HANDLES.codechef.username,
      url: CODING_HANDLES.codechef.url,
      stars: "3★",
      rating: "1600+ (3★)",
      solvedCount: 409,
      division: "Div 2 / Div 3"
    },
    atcoder: {
      platform: "AtCoder",
      handle: CODING_HANDLES.atcoder.username,
      url: CODING_HANDLES.atcoder.url,
      rating: 570,
      color: "Brown",
      rank: "30765th",
      topPercentage: "Top 24%"
    }
  }
};

export async function fetchAllCodingStats() {
  const stats = JSON.parse(JSON.stringify(initialCodingStats));

  // 1. Fetch Codeforces (Official Open API)
  try {
    const cfInfoRes = await fetch(
      `https://codeforces.com/api/user.info?handles=${CODING_HANDLES.codeforces.username}`
    );
    if (cfInfoRes.ok) {
      const cfInfoData = await cfInfoRes.json();
      if (cfInfoData.status === "OK" && cfInfoData.result?.[0]) {
        const u = cfInfoData.result[0];
        stats.platforms.codeforces.rating = u.rating || stats.platforms.codeforces.rating;
        stats.platforms.codeforces.maxRating = u.maxRating || stats.platforms.codeforces.maxRating;
        stats.platforms.codeforces.rank = u.rank || stats.platforms.codeforces.rank;
        stats.platforms.codeforces.organization = u.organization || "IET Lucknow";
      }
    }

    const cfStatusRes = await fetch(
      `https://codeforces.com/api/user.status?handle=${CODING_HANDLES.codeforces.username}&from=1&count=200`
    );
    if (cfStatusRes.ok) {
      const cfStatusData = await cfStatusRes.json();
      if (cfStatusData.status === "OK" && Array.isArray(cfStatusData.result)) {
        const acProblems = new Set();
        const recent = [];
        for (const sub of cfStatusData.result) {
          if (sub.verdict === "OK" && sub.problem) {
            const pid = `${sub.problem.contestId}-${sub.problem.index}`;
            acProblems.add(pid);
            if (recent.length < 5 && !recent.some((r) => r.title.includes(sub.problem.name))) {
              recent.push({
                title: `${sub.problem.index}. ${sub.problem.name}`,
                verdict: "Accepted",
                contestId: sub.problem.contestId
              });
            }
          }
        }
        if (acProblems.size > 0) {
          stats.platforms.codeforces.solvedCount = Math.max(acProblems.size, stats.platforms.codeforces.solvedCount);
        }
        if (recent.length > 0) {
          stats.platforms.codeforces.recentSubmissions = recent;
        }
      }
    }
  } catch (err) {
    console.warn("Codeforces API fetch error:", err);
  }

  // 2. Fetch LeetCode (Public API)
  try {
    const lcRes = await fetch(
      `https://leetcode-api-faisalshohag.vercel.app/${CODING_HANDLES.leetcode.username}`
    );
    if (lcRes.ok) {
      const lcData = await lcRes.json();
      if (lcData && typeof lcData.totalSolved === "number") {
        stats.platforms.leetcode.totalSolved = lcData.totalSolved;
        stats.platforms.leetcode.easy = lcData.easySolved || 0;
        stats.platforms.leetcode.medium = lcData.mediumSolved || 0;
        stats.platforms.leetcode.hard = lcData.hardSolved || 0;
        if (Array.isArray(lcData.recentSubmissions) && lcData.recentSubmissions.length > 0) {
          stats.platforms.leetcode.recentSubmissions = lcData.recentSubmissions
            .filter((s) => s.statusDisplay === "Accepted")
            .slice(0, 5)
            .map((s) => ({
              title: s.title,
              lang: s.lang || "C++",
              status: "Accepted"
            }));
        }
      }
    }
  } catch (err) {
    console.warn("LeetCode API fetch error:", err);
  }

  // 3. CodeChef & AtCoder Proxy Check
  try {
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const ccRes = await fetch(`${proxyUrl}${encodeURIComponent(CODING_HANDLES.codechef.url)}`);
    if (ccRes.ok) {
      const html = await ccRes.text();
      const ratingMatch = html.match(/"currentRating":([0-9]+)/) || html.match(/"rating":"([0-9]+)"/g);
      const solvedMatch = html.match(/Problems Solved:.*?([0-9]+)/i);
      if (ratingMatch) {
        const lastRating = Array.isArray(ratingMatch) ? ratingMatch[ratingMatch.length - 1] : ratingMatch;
        const num = String(lastRating).replace(/[^0-9]/g, "");
        if (num) stats.platforms.codechef.rating = `${num} (3★)`;
      }
      if (solvedMatch && solvedMatch[1]) {
        stats.platforms.codechef.solvedCount = parseInt(solvedMatch[1], 10);
      }
    }
  } catch (err) {
    console.warn("CodeChef fetch warning:", err);
  }

  try {
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const atcRes = await fetch(`${proxyUrl}${encodeURIComponent(CODING_HANDLES.atcoder.url)}`);
    if (atcRes.ok) {
      const html = await atcRes.text();
      const ratingMatch = html.match(/<span class=['"]user-brown['"]>([0-9]+)<\/span>/i) || html.match(/Rating<\/th><td>.*?([0-9]+)/i);
      const rankMatch = html.match(/<th class="no-break">Rank<\/th><td>([0-9]+th)/i);
      if (ratingMatch && ratingMatch[1]) {
        stats.platforms.atcoder.rating = parseInt(ratingMatch[1], 10);
      }
      if (rankMatch && rankMatch[1]) {
        stats.platforms.atcoder.rank = rankMatch[1];
      }
    }
  } catch (err) {
    console.warn("AtCoder fetch warning:", err);
  }

  // Calculate live aggregate total problems solved
  const total =
    stats.platforms.leetcode.totalSolved +
    stats.platforms.codeforces.solvedCount +
    stats.platforms.codechef.solvedCount;
  stats.totalProblemsSolved = Math.max(total, 865);
  stats.lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  stats.isLive = true;

  try {
    localStorage.setItem(STATS_CACHE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn("Could not cache coding stats", e);
  }

  return stats;
}

export function getCachedCodingStats() {
  try {
    const cached = localStorage.getItem(STATS_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn("Could not read cached coding stats", e);
  }
  return initialCodingStats;
}
