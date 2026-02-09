import React, { useEffect } from 'react';

import type { Activity, Region } from '../../api/dictionaries';

type RegistrationInfoProps = {
  isLoadingActivities: boolean;
  isLoadingRegions: boolean;
  activities: Activity[];
  regions: Region[];
  selectedActivity: string;
  selectedRegion: string;
  isLoadingSendSmsCode: boolean;
  loadActivities: () => void;
  loadRegions: () => void;
  setSelectedActivity: (activity: string) => void;
  setSelectedRegion: (region: string) => void;
  onGoBack: () => void;
  onStartSmsConfirmation: () => void;
};

export const RegistrationInfo = ({
  isLoadingActivities,
  isLoadingRegions,
  activities,
  regions,
  selectedActivity,
  selectedRegion,
  isLoadingSendSmsCode,
  loadActivities,
  loadRegions,
  setSelectedActivity,
  setSelectedRegion,
  onGoBack,
  onStartSmsConfirmation,
}: RegistrationInfoProps) => {
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  useEffect(() => {
    loadRegions();
  }, [loadRegions]);

  const activityRegionSelected = selectedActivity && selectedRegion;

  return (
    <div>
      <h1>Registration info</h1>
      {isLoadingActivities ? (
        <div>Loading activities...</div>
      ) : (
        <div>
          <label htmlFor="activity">
            Activity:
            <select
              id="activity"
              value={selectedActivity}
              onChange={e => setSelectedActivity(e.target.value)}
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <option value="" />
              {activities.map(activity => (
                <option key={activity.name} value={activity.name}>
                  {`${activity.groupName} - ${activity.label}`}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      {isLoadingRegions ? (
        <div>Loading regions...</div>
      ) : (
        <div>
          <label htmlFor="region">
            Region:
            <select
              id="region"
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <option value="" />
              {regions.map(region => (
                <option key={region.oktmo} value={region.oktmo}>
                  {region.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <br />
      <button
        type="button"
        disabled={isLoadingSendSmsCode || !activityRegionSelected}
        onClick={onStartSmsConfirmation}
      >
        Continue registration
      </button>
      <br />
      <button type="button" onClick={onGoBack}>
        Go back
      </button>
    </div>
  );
};
