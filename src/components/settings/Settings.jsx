import React from 'react';
import './Settings.css';

function Settings({ onChangeTestLength }) {
  return (
    <div className="settings-component">
      <h1>Settings</h1>
      <label>
        Test Length:
        <input type="number" onChange={(e) => onChangeTestLength(e.target.value)} />
      </label>

      <label>
        Option B:
        <select>
          <option value="words">Words</option>
        </select>
      </label>

      <label>
        Option C:
        <input type="checkbox" />
      </label>

      <span style={{ display: 'block', marginTop: '1rem', fontWeight: 'bold', fontSize: '1.5rem'}}>PRESS F5 FOR QUICK RESTART</span>
    </div>
  );
}

export default Settings;