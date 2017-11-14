const photos = [
  'https://tech.cornell.edu/uploads/bios/_landscape/Huttenlocher_Dan_2015_2.jpg',
  'https://static1.squarespace.com/static/58fe0fa0f7e0ab0af47a3cc5/58fe169e3a041197bb9e45ef/59010039d2b857b1a1cfb9c6/1493409350747/chi-laura-osnes-lyric-carousel-20141218.jpg?format=2500w',
  'https://static.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  'https://i.pinimg.com/736x/4f/3a/92/4f3a92ee2bea934ce5145c035c0a7baa--blue-eyed-people-blue-eyed-girls.jpg',
  'http://static6.businessinsider.com/image/51cdf71aeab8ea6b6000000a/10-real-people-who-are-winning-their-fight-with-debt.jpg',
  'https://ec.europa.eu/jrc/sites/jrcsh/files/styles/responsive-portrait/public/people-alberto-tumino.jpg?itok=VSoE0x9Z',
  'http://static-25.sinclairstoryline.com/resources/media/05a6cd34-12c3-40ba-6081-57115da02406-05a6cd3412c340ba608157115da02406rendition_0_aaron.jpg?1496686824202',
  'http://www.ecehh.org/wp-content/uploads/2017/10/JimW-Truro-Med-School-Portraits-162-300x300.jpg',
  'https://c.s-microsoft.com/en-us/CMSImages/People_seniorleadership_content_vp6.jpg?version=12558331-9f58-39a2-54fd-076072c38454',
  'https://www.mckinsey.com/~/media/McKinsey/Our%20People/Niclas%20Andersson/niclas-andersson_profile1_1536x1152.ashx?mw=400&car=2:2',
  'https://i.ytimg.com/vi/cJr226idrFg/maxresdefault.jpg',
  'https://usatcollege.files.wordpress.com/2014/09/sheldon-e1410802766174.jpg?w=1200',
  'http://www.crainsdetroit.com/sites/default/files/ArthurJemison-DEGC-mug-01_i.jpg',
  'https://i.pinimg.com/736x/f5/a0/62/f5a0626a80fe6026c0ac65cdc2d8ede2--photography-portraits-photography-people.jpg',
  'https://www.idea.int/sites/default/files/styles/board_advisor/public/staff/images/keboitse-machangana.png?itok=OtXgu_Mk',
  'http://www.mixnews.lv/uploads/mixer/images/2017/11/01/15_people_magazine_15_webmixerdetailed_jpg.jpg',
  'http://www.korea.net/upload/content/image/1507684583897.jpg',
  'http://www.ecehh.org/wp-content/uploads/2013/08/Emma-Bland-400x330.jpg',
  'https://leolearning.com/app/uploads/2015/12/People_Gareth-362x200.jpg',
  'https://www.idea.int/sites/default/files/styles/board_advisor/public/staff/images/yves-leterme.png?itok=ib7L3e2X',
  'https://www.mckinsey.com/~/media/McKinsey/Our%20People/Greg%20Kelly/Greg%20Kelly_thumbnail_img.ashx?mw=250&car=1:1',
  'http://www.unfpa.org/sites/default/files/styles/sowp_share_card/public/sowp/sharecards/card-08_2.png?itok=vnfzA97Q',
  'http://www.ecehh.org/wp-content/uploads/2013/08/Ian-Alcock-400x330.jpg',
  'http://i.telegraph.co.uk/multimedia/archive/03491/Vladimir_Putin_1_3491835k.jpg',
  'http://media.popculture.com/2017/06/alaskanbushpeople-ami-20005140-640x480.jpg',
  'https://campaignforsocialscience.org.uk/wp-content/uploads/2015/02/James-Wilsdon-214x300.jpg',
  'https://depts.washington.edu/fammed/assets/images/people/colea.thumbnail.jpg',
  'https://www.brainline.org/sites/default/files/styles/teaser_square/public/basic/Su%20Meck.jpg?itok=KW_oUzSg',
  'https://www.buffalo.edu/content/www/cted/People/jcr%3Acontent/par/image_1258073393.img.220.283.jpg/1504202947136.jpg',
  'https://yin.hms.harvard.edu/graphics/people.beliveau.brian.png'
]

export default () => {
  const min = 0
  const max = photos.length - 1
  const maxMinusMin = max - min
  const randomMulMaxMinusMin = Math.random() * (maxMinusMin + 1)
  const minMinusHalf = min - 0.5
  const rand = Math.round(minMinusHalf + randomMulMaxMinusMin)
  return photos[rand]
}
