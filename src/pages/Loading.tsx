/** @jsxImportSource @emotion/react */
import { redirect } from 'react-router-dom';

function Loading() {
  // /** Get user (Nice to have) */
  // const user = await getUser();
  // if (!user) {
  //   return redirect("/onboarding")
  // }
  // else return redirect("/analysis")
  return redirect('/analysis');
}

export default Loading;
