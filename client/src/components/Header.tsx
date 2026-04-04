import React from 'react';

import { Button } from './Button';
import { useTheme } from './ThemeProvider';
import { LayoutPage } from './layout';

type HeaderProps = {
  isLoadingLogout: boolean;
  onLogout: () => void;
};

export const Header = ({
  isLoadingLogout,
  onLogout,
}: HeaderProps) => {

  const { onToggleTheme } = useTheme();
  
  return (
    <LayoutPage>
      <div className="flex justify-between">
        <Button
          type="button"
          disabled={isLoadingLogout}
          onClick={onLogout}
        >
          Logout
        </Button>
        <div className="flex gap-2">
          {/* add disabled buttons */}
          <Button
            type="button"
            onClick={() => onToggleTheme('light')}
          >
            Light theme
          </Button>
          <Button
            type="button"
            onClick={() => onToggleTheme('dark')}
          >
            Dark theme
          </Button>
          <Button
            type="button"
            onClick={() => onToggleTheme('spring')}
          >
            Spring theme
          </Button>
        </div>
      </div>
    </LayoutPage>
  );
};
