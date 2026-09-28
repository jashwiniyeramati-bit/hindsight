import "./AIAnalysis.css";

function AIAnalysis({
  incidentId,
  onBack,
  onFeedback,
}) {
  const incidents = {
    "INC-104": {
      service: "Payment API",
      error: "MongoServerSelectionTimeoutError",
      severity: "P1 — Critical",
      detected: "10:42 AM",
      description:
        "Payment requests are failing because the service cannot establish a connection with MongoDB.",

      memories: [
        {
          id: "INC-087",
          service: "Payment API",
          match: "92%",
          description:
            "MongoDB connection failures after network configuration change.",
          outcome:
            "Network configuration rollback resolved the incident in 14 minutes.",
        },
        {
          id: "INC-064",
          service: "Orders API",
          match: "86%",
          description:
            "Database connection failures caused by infrastructure configuration.",
          outcome:
            "Configuration rollback restored database connectivity.",
        },
        {
          id: "INC-041",
          service: "Payment API",
          match: "78%",
          description:
            "MongoDB connectivity degradation after connection limit changes.",
          outcome:
            "Connection limits were adjusted and service recovered.",
        },
      ],

      reasoning:
        "The current MongoDB timeout pattern closely matches previous incidents where infrastructure or network configuration changes affected database connectivity. The strongest historical match was INC-087, where rolling back the network configuration successfully restored service.",

      recommendation:
        "Roll back the recent network configuration",

      recommendationReason:
        "This action matches the highest-confidence historical resolution and directly addresses the current database connectivity failure.",

      confidence: "92%",
    },

    "INC-103": {
      service: "Auth Service",
      error: "AuthenticationFailureRateExceeded",
      severity: "P2 — High",
      detected: "09:18 AM",
      description:
        "Authentication failures have increased significantly across the service.",

      memories: [
        {
          id: "INC-076",
          service: "Auth Service",
          match: "88%",
          description:
            "Authentication failures after identity provider configuration changes.",
          outcome:
            "Rolling back the authentication configuration resolved the incident.",
        },
        {
          id: "INC-052",
          service: "Identity Service",
          match: "81%",
          description:
            "Login failures caused by an authentication policy update.",
          outcome:
            "Reverting the policy restored authentication.",
        },
        {
          id: "INC-029",
          service: "Auth Service",
          match: "74%",
          description:
            "Elevated authentication errors after provider configuration changes.",
          outcome:
            "Previous provider configuration was restored.",
        },
      ],

      reasoning:
        "The current authentication failure pattern is similar to historical incidents involving identity-provider and authentication configuration changes. Historical outcomes indicate that configuration rollback is the most relevant recovery action.",

      recommendation:
        "Roll back the latest authentication configuration",

      recommendationReason:
        "Historical incidents with similar authentication failure patterns recovered after configuration rollback.",

      confidence: "88%",
    },

    "INC-102": {
      service: "Cache Service",
      error: "RedisMemoryLimitExceeded",
      severity: "P2 — High",
      detected: "08:51 AM",
      description:
        "Redis memory usage has exceeded the configured limit, causing cache failures and degraded performance.",

      memories: [
        {
          id: "INC-069",
          service: "Cache Service",
          match: "84%",
          description:
            "Redis memory exhaustion caused by stale entries and increased traffic.",
          outcome:
            "Stale entries were cleared and cache capacity was increased.",
        },
        {
          id: "INC-044",
          service: "Cache Service",
          match: "79%",
          description:
            "Cache memory growth exceeded configured limits.",
          outcome:
            "Memory allocation was increased and stale data was removed.",
        },
        {
          id: "INC-018",
          service: "Cache Service",
          match: "71%",
          description:
            "Redis memory pressure during increased traffic.",
          outcome:
            "Cache capacity was scaled to restore service.",
        },
      ],

      reasoning:
        "The current Redis memory failure closely resembles previous cache incidents where memory growth and stale entries caused service degradation. Historical outcomes indicate that clearing stale data and increasing capacity are relevant recovery actions.",

      recommendation:
        "Scale cache capacity and clear stale entries",

      recommendationReason:
        "The recommendation combines the two actions that successfully resolved similar historical memory-pressure incidents.",

      confidence: "84%",
    },
  };

  const incident =
    incidents[incidentId] || incidents["INC-104"];

  return (
    <main className="ai-analysis-page">

      {/* ================= HEADER ================= */}

      <header className="analysis-header">

        <button
          className="analysis-back"
          onClick={onBack}
        >
          ← Back to Incident Details
        </button>

        <div className="analysis-heading">

          <span className="analysis-eyebrow">
            AI INCIDENT INVESTIGATION
          </span>

          <h1>
            {incident.service} Investigation
          </h1>

          <p>
            Hindsight-powered analysis using current
            evidence and historical incident memory.
          </p>

          <span className="analysis-status">
            ✓ Analysis Complete
          </span>

        </div>

      </header>


      {/* ================= CURRENT INCIDENT ================= */}

      <section className="analysis-panel">

        <div className="panel-header">

          <div className="panel-title">

            <span className="panel-number">
              01
            </span>

            <div>
              <h2>
                Current Incident
              </h2>

              <p>
                Evidence collected from the active incident.
              </p>
            </div>

          </div>

        </div>


        <div className="evidence-grid">

          <div className="evidence-item">

            <span>
              SERVICE
            </span>

            <strong>
              {incident.service}
            </strong>

          </div>


          <div className="evidence-item">

            <span>
              ERROR
            </span>

            <strong>
              {incident.error}
            </strong>

          </div>


          <div className="evidence-item">

            <span>
              SEVERITY
            </span>

            <strong className="severity-value">
              {incident.severity}
            </strong>

          </div>


          <div className="evidence-item">

            <span>
              DETECTED
            </span>

            <strong>
              {incident.detected}
            </strong>

          </div>

        </div>


        <div className="incident-description">
          {incident.description}
        </div>

      </section>


      {/* ================= HINDSIGHT RECALL ================= */}

      <section className="analysis-panel">

        <div className="panel-header">

          <div className="panel-title">

            <span className="panel-number">
              02
            </span>

            <div>
              <h2>
                Hindsight Recall
              </h2>

              <p>
                Relevant historical incidents recalled
                from Hindsight memory.
              </p>
            </div>

          </div>

          <span className="memory-count">
            {incident.memories.length} memories
          </span>

        </div>


        <div className="memory-grid">

          {incident.memories.map((memory) => (

            <article
              className="recall-card"
              key={memory.id}
            >

              <div className="recall-top">

                <span className="match-score">
                  {memory.match}
                </span>

                <span className="match-label">
                  MATCH
                </span>

              </div>


              <div className="recall-id">
                {memory.id}
              </div>


              <h3>
                {memory.service}
              </h3>


              <p>
                {memory.description}
              </p>


              <div className="recall-outcome">

                <span>
                  HISTORICAL OUTCOME
                </span>

                <strong>
                  {memory.outcome}
                </strong>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= REASONING + RECOMMENDATION ================= */}

      <div className="analysis-two-column">

        <section className="analysis-panel reasoning-panel">

          <div className="panel-header">

            <div className="panel-title">

              <span className="panel-number">
                03
              </span>

              <div>
                <h2>
                  AI Reasoning
                </h2>

                <p>
                  How historical outcomes influenced
                  the recommendation.
                </p>
              </div>

            </div>

          </div>


          <div className="reasoning-content">

            <div className="reasoning-step">
              <span>01</span>

              <div>
                <strong>
                  Current evidence
                </strong>

                <p>
                  {incident.error} detected on{" "}
                  {incident.service}.
                </p>
              </div>
            </div>


            <div className="reasoning-line"></div>


            <div className="reasoning-step">
              <span>02</span>

              <div>
                <strong>
                  Historical patterns
                </strong>

                <p>
                  Similar incidents were recalled
                  from Hindsight memory.
                </p>
              </div>
            </div>


            <div className="reasoning-line"></div>


            <div className="reasoning-step">
              <span>03</span>

              <div>
                <strong>
                  Outcome-aware reasoning
                </strong>

                <p>
                  {incident.reasoning}
                </p>
              </div>
            </div>

          </div>

        </section>


        <section className="analysis-panel recommendation-panel">

          <div className="panel-header">

            <div className="panel-title">

              <span className="panel-number">
                04
              </span>

              <div>
                <h2>
                  Recommendation
                </h2>

                <p>
                  Suggested action based on evidence
                  and historical outcomes.
                </p>
              </div>

            </div>

          </div>


          <div className="recommendation-box">

            <div className="recommendation-icon">
              ✦
            </div>

            <div>

              <span>
                HINDSIGHT RECOMMENDATION
              </span>

              <h3>
                {incident.recommendation}
              </h3>

              <p>
                {incident.recommendationReason}
              </p>

            </div>

          </div>


          <div className="confidence-box">

            <div>

              <span>
                CONFIDENCE
              </span>

              <strong>
                {incident.confidence}
              </strong>

            </div>

            <div className="confidence-track">
              <div
                style={{
                  width: incident.confidence,
                }}
              ></div>
            </div>

          </div>

        </section>

      </div>


      {/* ================= HUMAN REVIEW ================= */}

      <section className="human-review">

        <div>

          <span>
            HUMAN-IN-THE-LOOP
          </span>

          <h2>
            Review before taking action
          </h2>

          <p>
            Hindsight provides evidence and a recommendation,
            but the engineer makes the final decision.
            Your feedback will become part of future learning.
          </p>

        </div>


        <button
          className="review-button"
          onClick={onFeedback}
        >
          Review & Give Feedback →
        </button>

      </section>

    </main>
  );
}

export default AIAnalysis;