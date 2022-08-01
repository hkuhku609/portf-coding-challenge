import axios from 'axios';
const url = 'https://api.punkapi.com/v2/beers';

const yearMonthDay = (date) => {
  const aa = date.length === 7 ? '01/' + date : '01/' + '01/' + date;
  const dateSplit = aa.split('/');
  return new Date(
    `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
  ).toISOString();
};

export const fetched = async () => {
  const array = [];
  try {
    for (let i = 1; i < 6; i++) {
      const { data: items } = await axios.get(`${url}?page=${i}&per_page=80`);
      if (items.length) {
        const modifiedData = items.map((item) => {
          return {
            // id: item.id,
            first_brewed: yearMonthDay(item.first_brewed),
            abv: item.abv,
          };
        });
        array.push(modifiedData);
      }
    }
    const rmSubarray = array.flat();
    // console.log(rmSubarray);
    return rmSubarray; //2007-09-01T00:00:00.000Z
  } catch (error) {}
};
