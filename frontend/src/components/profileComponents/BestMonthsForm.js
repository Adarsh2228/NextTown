import React from 'react';

const BestMonthsForm = ({ categoryInput, setCategoryInput, fetchBestMonths, loadingBestMonths, bestMonthsError, bestMonths }) => {
  return (
    <div>
      <h3>Get Best Performance Months</h3>
      <input
        type="text"
        placeholder="Enter category"
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
      />
      <button onClick={fetchBestMonths} disabled={loadingBestMonths}>
        {loadingBestMonths ? 'Loading...' : 'Get Best Months'}
      </button>
      {bestMonthsError && <p style={{ color: 'red' }}>{bestMonthsError}</p>}
      {Array.isArray(bestMonths) && bestMonths.length > 0 ? (
          <p>Best performing months: {bestMonths.map((monthObj, index) => `${index + 1}: ${monthObj}`).join(', ')}</p>
      ) : (
          <p>No best months available.</p>
      )}
    </div>
  );
};

export default BestMonthsForm;