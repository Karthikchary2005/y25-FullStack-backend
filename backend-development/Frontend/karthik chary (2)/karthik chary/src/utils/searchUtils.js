// AI-Inspired Intelligent search utilities for natural language query parsing

const CATEGORIES = [
  "UI Bug",
  "Backend",
  "Authentication",
  "Performance",
  "Database",
  "Security",
  "API",
  "Deployment"
];

const KEYWORD_MAP = {

  authentication: [
    "login",
    "signin",
    "signup",
    "auth",
    "oauth",
    "password",
    "token",
    "jwt",
    "session"
  ],

  uibug: [
    "css",
    "overlap",
    "color",
    "button",
    "align",
    "border",
    "font",
    "display",
    "responsive",
    "charts",
    "render"
  ],

  performance: [
    "slow",
    "leak",
    "speed",
    "memory",
    "latency",
    "lag",
    "optimize",
    "timeout",
    "concurrency"
  ],

  database: [
    "sql",
    "postgres",
    "pool",
    "exhaustion",
    "replica",
    "db",
    "query",
    "knex",
    "mongodb"
  ],

  security: [
    "injection",
    "xss",
    "vulnerability",
    "auth-bypass",
    "hack",
    "exploit",
    "leak",
    "cors"
  ],

  api: [
    "stripe",
    "webhook",
    "endpoint",
    "fetch",
    "axios",
    "payload",
    "rest",
    "graphql",
    "server"
  ],

  backend: [
    "node",
    "express",
    "server",
    "middleware",
    "crash",
    "500",
    "gateway"
  ],

  deployment: [
    "docker",
    "kubernetes",
    "cron",
    "prune",
    "staging",
    "pipeline",
    "runner",
    "ci/cd"
  ]
};


// NATURAL LANGUAGE PARSER
export const parseNaturalLanguageSearch = (query) => {

  if (
    !query ||
    query.trim() === ""
  ) {

    return {

      cleanedQuery: "",

      suggestedCategory: null,

      suggestedPriority: null,

      keywordsDetected: []
    };
  }

  const lowerQuery =
    query.toLowerCase();

  let suggestedCategory =
    null;

  let suggestedPriority =
    null;

  const keywordsDetected =
    [];

  // CATEGORY DETECTION
  let maxMatches = 0;

  Object.entries(KEYWORD_MAP).forEach(

    ([categoryKey, keywords]) => {

      let matches = 0;

      keywords.forEach(word => {

        if (
          lowerQuery.includes(word)
        ) {

          matches++;

          keywordsDetected.push(word);
        }
      });

      if (matches > maxMatches) {

        maxMatches = matches;

        if (
          categoryKey === "authentication"
        ) {

          suggestedCategory =
            "Authentication";
        }

        if (
          categoryKey === "uibug"
        ) {

          suggestedCategory =
            "UI Bug";
        }

        if (
          categoryKey === "performance"
        ) {

          suggestedCategory =
            "Performance";
        }

        if (
          categoryKey === "database"
        ) {

          suggestedCategory =
            "Database";
        }

        if (
          categoryKey === "security"
        ) {

          suggestedCategory =
            "Security";
        }

        if (
          categoryKey === "api"
        ) {

          suggestedCategory =
            "API";
        }

        if (
          categoryKey === "backend"
        ) {

          suggestedCategory =
            "Backend";
        }

        if (
          categoryKey === "deployment"
        ) {

          suggestedCategory =
            "Deployment";
        }
      }
    }
  );

  // PRIORITY DETECTION
  if (

    lowerQuery.includes("urgent") ||

    lowerQuery.includes("critical") ||

    lowerQuery.includes("crash") ||

    lowerQuery.includes("break") ||

    lowerQuery.includes("injection") ||

    lowerQuery.includes("security")

  ) {

    suggestedPriority =
      "CRITICAL";

  } else if (

    lowerQuery.includes("high") ||

    lowerQuery.includes("slow") ||

    lowerQuery.includes("leak") ||

    lowerQuery.includes("exhaustion")

  ) {

    suggestedPriority =
      "HIGH";

  } else if (

    lowerQuery.includes("medium") ||

    lowerQuery.includes("moderate") ||

    lowerQuery.includes("overlap") ||

    lowerQuery.includes("css")

  ) {

    suggestedPriority =
      "MEDIUM";

  } else if (

    lowerQuery.includes("low") ||

    lowerQuery.includes("minor") ||

    lowerQuery.includes("trivial")

  ) {

    suggestedPriority =
      "LOW";
  }

  return {

    cleanedQuery:
      query.trim(),

    suggestedCategory,

    suggestedPriority,

    keywordsDetected:
      [...new Set(keywordsDetected)]
  };
};


// SEARCH + SCORE
export const searchAndScoreIssues = (

  issues,

  searchQuery

) => {

  if (
    !searchQuery ||
    searchQuery.trim() === ""
  ) {

    return issues;
  }

  const parsed =
    parseNaturalLanguageSearch(
      searchQuery
    );

  const terms =
    parsed.cleanedQuery

      .toLowerCase()

      .split(/\s+/)

      .filter(t => t.length > 1);

  const scoredIssues =
    issues.map(issue => {

      let score = 0;

      const titleLower =
        String(issue.title || '')
          .toLowerCase();

      const descLower =
        String(issue.description || '')
          .toLowerCase();

      const catLower =
        String(issue.category || '')
          .toLowerCase();

      const idLower =
        String(issue.id || '')
          .toLowerCase();

      // ID MATCH
      if (

        parsed.cleanedQuery
          .toLowerCase()

          === idLower

      ) {

        score += 100;
      }

      // TITLE MATCH
      if (

        titleLower.includes(

          parsed.cleanedQuery
            .toLowerCase()
        )
      ) {

        score += 40;
      }

      // CATEGORY MATCH
      if (

        parsed.suggestedCategory &&

        issue.category ===
        parsed.suggestedCategory

      ) {

        score += 25;
      }

      // TERM MATCH
      terms.forEach(term => {

        if (
          titleLower.includes(term)
        ) {

          score += 15;
        }

        if (
          descLower.includes(term)
        ) {

          score += 5;
        }

        if (
          catLower.includes(term)
        ) {

          score += 10;
        }
      });

      // PRIORITY MATCH
      if (

        parsed.suggestedPriority &&

        issue.priority ===
        parsed.suggestedPriority

      ) {

        score += 10;
      }

      return {

        ...issue,

        matchScore: score
      };
    });

  // FILTER RESULTS
  const filtered =
    scoredIssues.filter(issue => {

      if (
        terms.length === 0
      ) {

        return true;
      }

      return issue.matchScore > 0;
    });

  // SORT
  return filtered.sort(

    (a, b) =>

      b.matchScore -
      a.matchScore
  );
};


// SIMILAR ISSUES
export const getSimilarIssues = (
  issue,
  allIssues
) => {

  if (!issue) return [];

  return allIssues

    .filter(i =>

      i.id !== issue.id && (

        i.category === issue.category ||

        i.priority === issue.priority
      )
    )

    .slice(0, 3);
};