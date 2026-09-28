import "./IncidentList.css";

function IncidentList({ onBack, onIncidentClick }) {
  return (
    <main className="incident-page">

      <div className="incident-page-header">
        <div>
          <button className="back-button" onClick={onBack}>
            ← Dashboard
          </button>

          <h1>Incidents</h1>

          <p>
            Monitor and investigate production incidents
          </p>
        </div>

        <button className="new-incident-btn">
          + New Incident
        </button>
      </div>


      <div className="incident-toolbar">

        <input
          type="text"
          placeholder="Search incidents..."
        />

        <select>
          <option>All Severities</option>
          <option>P1</option>
          <option>P2</option>
          <option>P3</option>
        </select>

        <select>
          <option>All Statuses</option>
          <option>Investigating</option>
          <option>Monitoring</option>
          <option>Resolved</option>
        </select>

      </div>


      <div className="incident-table">

        <div className="table-header">
          <span>Incident</span>
          <span>Service</span>
          <span>Severity</span>
          <span>Error</span>
          <span>Status</span>
          <span>Deployment</span>
          <span>Time</span>
        </div>


        {/* INC-104 */}

        <div
          className="table-row clickable-row"
          onClick={() => onIncidentClick("INC-104")}
        >

          <strong>INC-104</strong>

          <span>payment-api</span>

          <span>
            <b className="severity-badge p1">
              P1
            </b>
          </span>

          <span className="error-text">
            MongoServerSelectionTimeoutError
          </span>

          <span>
            <b className="status-badge investigating">
              Investigating
            </b>
          </span>

          <span>v2.4.1</span>

          <span className="time-text">
            10:42 AM
          </span>

        </div>


        {/* INC-103 */}

        <div
          className="table-row clickable-row"
          onClick={() => onIncidentClick("INC-103")}
        >

          <strong>INC-103</strong>

          <span>auth-service</span>

          <span>
            <b className="severity-badge p2">
              P2
            </b>
          </span>

          <span className="error-text">
            Authentication timeout
          </span>

          <span>
            <b className="status-badge investigating">
              Investigating
            </b>
          </span>

          <span>v3.1.0</span>

          <span className="time-text">
            09:31 AM
          </span>

        </div>


        {/* INC-102 */}

        <div
          className="table-row clickable-row"
          onClick={() => onIncidentClick("INC-102")}
        >

          <strong>INC-102</strong>

          <span>cache-service</span>

          <span>
            <b className="severity-badge p3">
              P3
            </b>
          </span>

          <span className="error-text">
            Redis connection errors
          </span>

          <span>
            <b className="status-badge monitoring">
              Monitoring
            </b>
          </span>

          <span>v1.8.2</span>

          <span className="time-text">
            08:15 AM
          </span>

        </div>


        {/* INC-101 */}

        <div
          className="table-row clickable-row"
          onClick={() => onIncidentClick("INC-101")}
        >

          <strong>INC-101</strong>

          <span>orders-api</span>

          <span>
            <b className="severity-badge p2">
              P2
            </b>
          </span>

          <span className="error-text">
            HTTP 502 Bad Gateway
          </span>

          <span>
            <b className="status-badge resolved">
              Resolved
            </b>
          </span>

          <span>v4.2.0</span>

          <span className="time-text">
            Yesterday
          </span>

        </div>

      </div>

    </main>
  );
}

export default IncidentList;