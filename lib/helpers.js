const formatTimezone = ( timezoneOffset ) => {
  const sign = timezoneOffset < 0 ? '+' : '-';
  const hours = String( parseInt( Math.abs( timezoneOffset ) / 60 ) );
  const minutes = String( timezoneOffset % 60 );
  return `${ sign }${ hours.length === 1 ? '0' : '' }${ hours }:${ minutes.length === 1 ? '0' : '' }${ minutes }`;
};

const getRFCDate = () => {
  const timezoneOffset = new Date().getTimezoneOffset();
  const date = ( new Date( Date.now() - timezoneOffset * 60000 ).toISOString() ).slice( 0, -1 );
  return `${ date }${ formatTimezone( timezoneOffset ) }`;
};

module.exports = {
  getRFCDate
};
