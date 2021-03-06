import React, { useState } from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SyrupInfo } from 'state/stake/hooks';
import { unwrappedToken } from 'utils/wrappedCurrency';
import { CurrencyLogo } from 'components';
import { formatCompact } from 'utils';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import SyrupAPR from './SyrupAPR';
import SyrupCardDetails from './SyrupCardDetails';

const useStyles = makeStyles(({ palette }) => ({
  syrupCard: {
    background: palette.secondary.dark,
    width: '100%',
    borderRadius: 10,
    marginTop: 24,
  },
  syrupText: {
    fontSize: 14,
    fontWeight: 600,
    color: palette.text.secondary,
  },
}));

const SyrupCard: React.FC<{ syrup: SyrupInfo }> = ({ syrup }) => {
  const { palette, breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('xs'));
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const currency = unwrappedToken(syrup.token);

  const depositAmount = syrup.valueOfTotalStakedAmountInUSDC
    ? `$${Number(syrup.valueOfTotalStakedAmountInUSDC).toLocaleString()}`
    : `${syrup.totalStakedAmount.toSignificant(6, { groupSeparator: ',' }) ??
        '-'} ${syrup.stakingToken.symbol}`;

  const syrupEarnedUSD =
    Number(syrup.earnedAmount.toSignificant()) *
    Number(syrup.rewardTokenPriceinUSD ?? 0);

  return (
    <Box className={classes.syrupCard}>
      <Box
        display='flex'
        flexWrap='wrap'
        alignItems='center'
        width={1}
        padding={2}
        style={{ cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}
      >
        {isMobile ? (
          <>
            <Box
              display='flex'
              alignItems='center'
              width={expanded ? 0.95 : 0.5}
            >
              <CurrencyLogo currency={currency} size='32px' />
              <Box ml={1.5}>
                <Typography variant='body2'>{currency.symbol}</Typography>
              </Box>
            </Box>
            {!expanded && (
              <Box width={0.45}>
                <SyrupAPR syrup={syrup} />
              </Box>
            )}
            <Box
              width={0.05}
              display='flex'
              justifyContent='flex-end'
              color={palette.primary.main}
            >
              {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Box>
          </>
        ) : (
          <>
            <Box width={0.3} display='flex' alignItems='center'>
              <CurrencyLogo currency={currency} size='32px' />
              <Box ml={1.5}>
                <Typography variant='body2'>{currency.symbol}</Typography>
                <Box display='flex' mt={0.25}>
                  <Typography variant='caption'>
                    {syrup.rate >= 1000000
                      ? formatCompact(syrup.rate)
                      : syrup.rate.toLocaleString()}
                    <span style={{ color: palette.text.secondary }}>
                      {' '}
                      / day
                    </span>
                  </Typography>
                </Box>
                <Box display='flex' mt={0.25}>
                  <Typography variant='caption'>
                    $
                    {Number(
                      (
                        syrup.rate * Number(syrup.rewardTokenPriceinUSD)
                      ).toFixed(2),
                    ).toLocaleString()}{' '}
                    <span style={{ color: palette.text.secondary }}>
                      {' '}
                      / day
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box width={0.3}>
              <Typography variant='body2'>{depositAmount}</Typography>
            </Box>
            <Box width={0.2} textAlign='left'>
              <SyrupAPR syrup={syrup} />
            </Box>
            <Box width={0.2} textAlign='right'>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='flex-end'
                mb={0.25}
              >
                <CurrencyLogo currency={currency} size='16px' />
                <Typography variant='body2' style={{ marginLeft: 5 }}>
                  {syrup.earnedAmount.toSignificant(2)}
                </Typography>
              </Box>
              <Typography
                variant='body2'
                style={{ color: palette.text.secondary }}
              >
                {syrupEarnedUSD > 0 && syrupEarnedUSD < 0.001
                  ? '< $0.001'
                  : `$${syrupEarnedUSD.toLocaleString()}`}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {expanded && syrup && <SyrupCardDetails token={syrup.token} />}
    </Box>
  );
};

export default React.memo(SyrupCard);
