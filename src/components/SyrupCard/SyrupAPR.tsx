import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { SyrupInfo } from 'state/stake/hooks';
import { CurrencyLogo } from 'components';
import { returnTokenFromKey, getTokenAPRSyrup, getDQUICKAPYSyrup } from 'utils';

const SyrupAPR: React.FC<{ syrup: SyrupInfo }> = ({ syrup }) => {
  const { palette } = useTheme();
  const isDQUICKStakingToken = syrup.stakingToken.equals(
    returnTokenFromKey('DQUICK'),
  );
  const dQUICKAPY = getDQUICKAPYSyrup(syrup);

  return (
    <>
      <Typography variant='body2' style={{ color: palette.success.main }}>
        {getTokenAPRSyrup(syrup).toLocaleString()}%
      </Typography>
      {isDQUICKStakingToken && (
        <Box display='flex'>
          <Box
            borderRadius='4px'
            border={`1px solid ${palette.grey.A400}`}
            padding='4px'
            marginTop='4px'
            display='flex'
            alignItems='center'
          >
            <CurrencyLogo currency={returnTokenFromKey('QUICK')} size='12px' />
            <Typography variant='caption' style={{ marginLeft: 4 }}>
              {dQUICKAPY}% <span style={{ color: palette.text.hint }}>APY</span>
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SyrupAPR;
