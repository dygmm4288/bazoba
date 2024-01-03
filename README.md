# 프로젝트 명 : BAZOBA (바조바)

내 프로젝트 좀 봐조봐~

## 프로젝트 소개

열심히 만든 프로젝트를 공유하고 다른 여러 사람들에게 자랑해보세요.

그리고 소중한 피드백을 받아 더 발전된 사람이 되길 바라겠습니다.

좋아하는 프로젝트에 대해서 찜을 하거나 댓글을 남기면서 사람들과 생각도 공유할 수 있습니다.

## 기능 자랑

- 프로젝트에 대한 진지한 리뷰를 받고 싶으신가요? 철저한 비밀 리뷰로 피드백을 받을 수 있습니다.
- 다른 분들의 프로젝트에 응원의 좋아요와 댓글 부탁드려요.
- 가장 많은 좋아요❤를 받은 프로젝트는 메인화면 명예의 전당에 올려드릴게요.
- 관심있는 프로젝트는 나중에 다시 볼 수 있도록 북마크🚩 해보세요~!
- 같이 프로젝트에 참여한 동료들을 co-workers로 등록 하세요!
- 내가 작성한 글, 내가 참여한 프로젝트, 그리고 북마크한 페이지는 마이페이지에서 확인 하실 수 있어요!
- 내 게시물에 댓글이나 좋아요가 달리면 상단바를 통해 알람을 확인하실 수 있답니다!


## 긱 페이지 설명

Home : 프로젝트 소개 게시물을 보여주고, 내배캠 트랙 카테고리 별로 필터링 할 수 있다.

Login : 로그인, 회원가입 (소셜로그인 - 구글, github)

Editor : 게시물 작성 (toast ui editor 사용)

Detail : 각게시물 상세 페이지

## Dependencies
#### JS Library
- `React`

#### Routing
- `React-router-dom`

#### State Management
- `tanstack/React Query`
- `Recoil`

#### Database
- `supabase`

#### text editor
- `Toast ui editor`

#### Functional Programming
- `Ramda`

#### Styling
- `Ant Design`
- `Styled-components`
- `React-icons`

## File Structure
```
📦src
 ┣ 📂assets
 ┃ ┗ 📂images
 ┃   ┗ 📜logo.svg
 ┃ 
 ┣ 📂components
 ┃ ┣ 📂Detail
 ┃ ┃ ┣ 📜DetailActions.tsx
 ┃ ┃ ┣ 📜DetailComment.tsx
 ┃ ┃ ┣ 📜DetailContent.tsx
 ┃ ┃ ┣ 📜DetailFormComment.tsx
 ┃ ┃ ┗ 📜DetailReviewComment.tsx
 ┃ ┃
 ┃ ┣ 📂Editor
 ┃ ┃ ┣ 📂mention
 ┃ ┃ ┃ ┣ 📜EditorMention.tsx
 ┃ ┃ ┃ ┣ 📜EditorMentionLabel.tsx
 ┃ ┃ ┃ ┗ 📜EditorMentionSearchResult.tsx
 ┃ ┃ ┃ 
 ┃ ┃ ┣ 📜EditorHeader.tsx
 ┃ ┃ ┣ 📜EditorMain.tsx
 ┃ ┃ ┣ 📜EditorPost.tsx
 ┃ ┃ ┗ 📜EditorUploadLoading.tsx
 ┃ ┃ 
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜HeaderWrapper.tsx
 ┃ ┃ ┣ 📜Notification.tsx
 ┃ ┃ ┗ 📜NotificationList.tsx
 ┃ ┃ 
 ┃ ┣ 📂Mypage
 ┃ ┃ ┣ 📜AvatarForm.tsx
 ┃ ┃ ┣ 📜FilteredBookmarkPosts.tsx
 ┃ ┃ ┣ 📜FilteredPosts.tsx
 ┃ ┃ ┣ 📜FilteredProjects.tsx
 ┃ ┃ ┗ 📜Profile.tsx
 ┃ ┃ 
 ┃ ┣ 📂homepage
 ┃ ┃ ┣ 📜CarouselWrapper.tsx
 ┃ ┃ ┣ 📜FilterPost.tsx
 ┃ ┃ ┣ 📜Post.tsx
 ┃ ┃ ┗ 📜PostList.tsx
 ┃ ┃ 
 ┃ ┗ 📂layout
 ┃   ┗ 📜Header.tsx
 ┃ 
 ┣ 📂hooks
 ┃ ┣ 📂query
 ┃ ┃ ┣ 📜query.keys.ts
 ┃ ┃ ┗ 📜useSupabase.tsx
 ┃ ┃
 ┃ ┣ 📜useAnimated.ts
 ┃ ┣ 📜useCarousel.ts
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useEditorForm.ts
 ┃ ┗ 📜useEditorQuery.tsx
 ┃
 ┣ 📂lib
 ┃ ┣ 📜addUniqItemByCondition.ts
 ┃ ┗ 📜extractText.ts
 ┃
 ┣ 📂pages
 ┃ ┣ 📜Detail.tsx
 ┃ ┣ 📜Editor.tsx
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┗ 📜Mypage.tsx
 ┃
 ┣ 📂recoil
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜editor.ts
 ┃ ┣ 📜filter.ts
 ┃ ┣ 📜keys.ts
 ┃ ┗ 📜notification.ts
 ┃
 ┣ 📂shared
 ┃ ┣ 📜Layout.tsx
 ┃ ┗ 📜Router.tsx
 ┃
 ┣ 📂supabase
 ┃ ┣ 📜data.ts
 ┃ ┣ 📜error.types.ts
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜supabase.types.ts
 ┃ ┗ 📜supabaseSchema.types.ts
 ┃
 ┣ 📜App.tsx
 ┣ 📜GlobalStyle.tsx
 ┗ 📜index.tsx
```

## 담당자

코드 문의와 유지보수 문의는 아래 각 파트 담당자에게 부탁드립니다.

이진호 - Editor  

송용승 - Main

정효창 - Detail

김주희 - Login, Mypage
