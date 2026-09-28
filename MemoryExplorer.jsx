import { useMemo, useState } from "react";
import "./MemoryExplorer.css";

function MemoryExplorer({ onBack, learnedMemory }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedMemory, setSelectedMemory] = useState(null);

  const memories = [
    {
      id: "INC-087",
      title: "Payment API database timeout",
      match: 92,
      rootCause: "Network configuration",
      resolution: "Rolled back network configuration",
      outcome: "Successfully Resolved",
      age: "14 days ago",
    },
    {
      id: "INC-064",
      title: "Orders API connection failures",
      match: 78,
      rootCause: "Connection pool exhaustion",
      resolution: "Increased connection pool",
      outcome: "Successfully Resolved",
      age: "31 days ago",
    },
    {
      id: "INC-041",
      title: "MongoDB connectivity degradation",
      match: 64,
      rootCause: "Database connection limits",
      resolution: "Adjusted connection limits",
      outcome: "Successfully Resolved",
      age: "67 days ago",
    },
  ];

  /*
   * Add the newly learned memory after engineer feedback.
   */
  if (learnedMemory) {
    memories.unshift({
      id: learnedMemory.incidentId,
      title: `${learnedMemory.service} incident outcome`,
      match: 100,
      rootCause: "Network configuration change",
      resolution: learnedMemory.recommendation,
      outcome:
        learnedMemory.outcome === "resolved"
          ? "Successfully Resolved"
          : learnedMemory.outcome === "partial"
          ? "Partially Resolved"
          : "Resolution Failed",
      age: "Just now",
      newMemory: true,
      decision: learnedMemory.decision,
      comment: learnedMemory.comment,
    });
  }

  const filteredMemories = useMemo(() => {
    let result = memories.filter((memory) => {
      const text = `
        ${memory.id}
        ${memory.title}
        ${memory.rootCause}
        ${memory.resolution}
        ${memory.outcome}
      `.toLowerCase();

      return text.includes(search.toLowerCase());
    });

    if (sortBy === "match") {
      result.sort((a, b) => b.match - a.match);
    }

    if (sortBy === "recent") {
      result.sort((a, b) => {
        if (a.age === "Just now") return -1;
        if (b.age === "Just now") return 1;
        return 0;
      });
    }

    return result;
  }, [search, sortBy, learnedMemory]);

  const getMatchClass = (match) => {
    if (match >= 90) return "high-match";
    if (match >= 75) return "medium-match";
    return "low-match";
  };

  return (
    <main className="memory-page">

      <button
        className="memory-back"
        onClick={onBack}
      >
        ← Dashboard
      </button>

      {/* Header */}

      <div className="memory-header">

        <div>
          <h1>Memory Explorer</h1>

          <p>
            Explore what Hindsight has learned from
            previous incidents
          </p>
        </div>

        <div className="memory-count">

          <strong>
            {learnedMemory ? 129 : 128}
          </strong>

          <span>
            Learned Memories
          </span>

        </div>

      </div>


      {/* Search */}

      <div className="memory-search">

        <span>🔍</span>

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search incidents, root causes, resolutions..."
        />

        <button
          onClick={() => setSearch(search.trim())}
        >
          Search
        </button>

      </div>


      {/* Stats */}

      <section className="memory-stats">

        <div>
          <span>Total Memories</span>

          <strong>
            {learnedMemory ? 129 : 128}
          </strong>
        </div>

        <div>
          <span>Used in Recommendations</span>

          <strong>
            94
          </strong>
        </div>

        <div>
          <span>Successful Outcomes</span>

          <strong>
            87%
          </strong>
        </div>

        <div>
          <span>Learned This Week</span>

          <strong>
            {learnedMemory ? 9 : 8}
          </strong>
        </div>

      </section>


      {/* Memory List */}

      <section>

        <div className="memory-list-header">

          <div>
            <h2>
              Historical Memories
            </h2>

            <p>
              Past incidents that can influence
              current reasoning
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="relevance">
              Most Relevant
            </option>

            <option value="recent">
              Most Recent
            </option>

            <option value="match">
              Highest Confidence
            </option>
          </select>

        </div>


        {/* Empty Search State */}

        {filteredMemories.length === 0 && (

          <div className="memory-empty">

            <div>🔍</div>

            <h3>
              No memories found
            </h3>

            <p>
              Try searching for another incident,
              service, root cause, or resolution.
            </p>

          </div>

        )}


        {/* Memory Cards */}

        {filteredMemories.map((memory) => (

          <div
            className={
              memory.newMemory
                ? "explorer-card new-memory"
                : "explorer-card"
            }
            key={memory.id}
          >

            {memory.newMemory && (
              <div className="new-memory-label">
                🧠 NEWLY LEARNED
              </div>
            )}

            <div className="explorer-card-top">

              <div>

                <span className="memory-id">
                  {memory.id}
                </span>

                <h3>
                  {memory.title}
                </h3>

              </div>

              <span
                className={`match ${getMatchClass(
                  memory.match
                )}`}
              >
                {memory.match}% Match
              </span>

            </div>


            <div className="memory-details">

              <div>
                <span>
                  ROOT CAUSE
                </span>

                <strong>
                  {memory.rootCause}
                </strong>
              </div>

              <div>
                <span>
                  RESOLUTION
                </span>

                <strong>
                  {memory.resolution}
                </strong>
              </div>

              <div>
                <span>
                  OUTCOME
                </span>

                <strong
                  className={
                    memory.outcome ===
                    "Successfully Resolved"
                      ? "success-text"
                      : ""
                  }
                >
                  {memory.outcome}
                </strong>
              </div>

            </div>


            <div className="memory-footer">

              <span>
                Learned from incident · {memory.age}
              </span>

              <button
                onClick={() =>
                  setSelectedMemory(memory)
                }
              >
                View Memory →
              </button>

            </div>

          </div>

        ))}

      </section>


      {/* Selected Memory */}

      {selectedMemory && (

        <div className="memory-detail-panel">

          <div className="detail-panel-header">

            <div>
              <span>
                HINDSIGHT MEMORY
              </span>

              <h2>
                {selectedMemory.id}
              </h2>
            </div>

            <button
              onClick={() =>
                setSelectedMemory(null)
              }
            >
              ×
            </button>

          </div>

          <div className="detail-panel-grid">

            <div>
              <span>INCIDENT</span>

              <strong>
                {selectedMemory.title}
              </strong>
            </div>

            <div>
              <span>MATCH</span>

              <strong>
                {selectedMemory.match}%
              </strong>
            </div>

            <div>
              <span>ROOT CAUSE</span>

              <strong>
                {selectedMemory.rootCause}
              </strong>
            </div>

            <div>
              <span>RESOLUTION</span>

              <strong>
                {selectedMemory.resolution}
              </strong>
            </div>

            <div>
              <span>OUTCOME</span>

              <strong>
                {selectedMemory.outcome}
              </strong>
            </div>

            {selectedMemory.decision && (
              <div>
                <span>
                  ENGINEER DECISION
                </span>

                <strong>
                  {selectedMemory.decision}
                </strong>
              </div>
            )}

          </div>

          {selectedMemory.comment && (

            <div className="memory-note">

              <span>
                ENGINEER NOTE
              </span>

              <p>
                {selectedMemory.comment}
              </p>

            </div>

          )}

        </div>

      )}


      {/* Learning Loop */}

      <section className="learning-loop">

        <div>

          <h2>
            How Hindsight Learns
          </h2>

          <p>
            Every resolved incident becomes
            organizational memory.
          </p>

        </div>

        <div className="loop">

          <div className="loop-step">
            <span>1</span>
            <strong>Incident</strong>
            <small>Current evidence</small>
          </div>

          <div className="loop-arrow">
            →
          </div>

          <div className="loop-step">
            <span>2</span>
            <strong>Recall</strong>
            <small>Find similar history</small>
          </div>

          <div className="loop-arrow">
            →
          </div>

          <div className="loop-step">
            <span>3</span>
            <strong>Reason</strong>
            <small>Generate recommendation</small>
          </div>

          <div className="loop-arrow">
            →
          </div>

          <div className="loop-step">
            <span>4</span>
            <strong>Learn</strong>
            <small>Store actual outcome</small>
          </div>

        </div>

      </section>

    </main>
  );
}

export default MemoryExplorer;