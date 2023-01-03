import { Affix, Box, Button, List, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons";
import { ItemWithTitle } from "@/shared/components/ItemWithTitle";
import { APP_NAME } from "@/shared/constants";

export const TermsPage = () => {
  const [scroll] = useWindowScroll();

  return (
    <>
      <Box component="h1" fz="xl">
        利用規約
      </Box>

      <ItemWithTitle>
        <p>
          本利用規約（以下「本規約」と言います。）には、本サービスの提供条件及び当方とユーザーの皆様との間の権利義務関係が定められています。本サービスの利用を開始した場合には、本サービスの利用規約に同意したものとみなします。
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="第1条（適用）">
        <p>
          本規約は、本サービスの提供条件及び本サービスの利用に関する当方とユーザーとの間の権利義務関係を定めることを目的とし、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されます。
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="第2条（定義）">
        <p>
          本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。
        </p>
        <Box pl="lg">
          (1)
          「サービス利用契約」とは、本規約を契約条件として当方とユーザーの間で締結される、本サービスの利用契約を意味します。
          <br />
          (2) 「当方」とは、開発者である【K-kind】を意味します。
          <br />
          (3)
          「当ウェブサイト」とは、そのドメインが「【planning-poker.k-kind.dev】」である、当方が運営するウェブサイト（理由の如何を問わず、当方のウェブサイトのドメインまたは内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。
          <br />
          (4) 「ユーザー」とは、本サービスを利用する個人または法人を意味します。
          <br />
          (5) 「本サービス」とは、当方が提供する【{APP_NAME}
          】という名称のサービス（理由の如何を問わずサービスの名称または内容が変更された場合は、当該変更後のサービスを含みます。）を意味します。
        </Box>
      </ItemWithTitle>

      <ItemWithTitle title="第3条（利用料金）">
        <p>
          ユーザーは、本サービスの利用に関して、利用料金の負担はありません。
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="第4条（禁止事項）">
        <p>
          ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると当方が判断する行為をしてはなりません。
        </p>
        <Box pl="lg">
          (1) 法令に違反する行為または犯罪行為に関連する行為
          <br />
          (2)
          当方、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為
          <br />
          (3) 公序良俗に反する行為
          <br />
          (4)
          当方、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為
          <br />
          (5)
          本サービスを通じ、以下に該当し、または該当すると当方が判断する情報を当方または本サービスの他の利用者に送信すること
          <Box pl="lg">
            ・過度に暴力的または残虐な表現を含む情報
            <br />
            ・コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報
            <br />
            ・当方、本サービスの他の利用者またはその他の第三者の名誉または信用を毀損する表現を含む情報
            <br />
            ・過度にわいせつな表現を含む情報
            <br />
            ・差別を助長する表現を含む情報
            <br />
            ・自殺、自傷行為を助長する表現を含む情報
            <br />
            ・薬物の不適切な利用を助長する表現を含む情報
            <br />
            ・反社会的な表現を含む情報
            <br />
            ・チェーンメール等の第三者への情報の拡散を求める情報
            <br />
            ・他人に不快感を与える表現を含む情報
            <br />
          </Box>
          (6) 本サービスのネットワークまたはシステム等に過度な負荷をかける行為
          <br />
          (7)
          当方が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為
          <br />
          (8) 本サービスの運営を妨害するおそれのある行為
          <br />
          (9) 当方のネットワークまたはシステム等への不正アクセス
          <br />
          (10) 第三者に成りすます行為
          <br />
          (11) 本サービスの他の利用者のIDまたはパスワードを利用する行為
          <br />
          (12)
          当方が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
          <br />
          (13) 本サービスの他の利用者の情報の収集
          <br />
          (14)
          当方、本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為
          <br />
          (15) 反社会的勢力等への利益供与
          <br />
          (16) 面識のない異性との出会いを目的とした行為
          <br />
          (17) 前各号の行為を直接または間接に惹起し、または容易にする行為
          <br />
          (18) 前各号の行為を試みること
          <br />
          (19) その他、当方が不適切と判断する行為
        </Box>
      </ItemWithTitle>

      <ItemWithTitle title="第5条（本サービスの停止等）">
        <p>
          当方は、以下のいずれかに該当する場合には、ユーザーに事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
        </p>
        <Box pl="lg">
          (1)
          本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合
          <br />
          (2)
          コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合
          <br />
          (3)
          地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合
          <br />
          (4) その他、当方が停止または中断を必要と判断した場合
        </Box>
      </ItemWithTitle>

      <ItemWithTitle title="第6条（本サービスの内容の変更、終了）">
        <List type="ordered">
          <List.Item>
            当方は、当方の都合により、本サービスの内容を変更し、または提供を終了することができます。
          </List.Item>
          <List.Item>
            当方が本サービスの提供を終了する場合、当方はユーザーに事前に通知するものとします。
          </List.Item>
        </List>
      </ItemWithTitle>

      <ItemWithTitle title="第7条（保証の否認及び免責）">
        <List type="ordered">
          <List.Item>
            当方は、本サービスがユーザーの特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、ユーザーによる本サービスの利用がユーザーに適用のある法令または業界団体の内部規則等に適合すること、継続的に利用できること、及び不具合が生じないことについて、明示又は黙示を問わず何ら保証するものではありません。
          </List.Item>
          <List.Item>
            当方は、本サービスに関してユーザーが被った損害につき、過去【12ヶ月】間にユーザーが当方に支払った対価の金額を超えて賠償する責任を負わないものとし、また、付随的損害、間接損害、特別損害、将来の損害及び逸失利益にかかる損害については、賠償する責任を負わないものとします。
          </List.Item>
          <List.Item>
            本サービスまたは当ウェブサイトに関連してユーザーと他のユーザーまたは第三者との間において生じた取引、連絡、紛争等については、ユーザーが自己の責任によって解決するものとします。
          </List.Item>
        </List>
      </ItemWithTitle>

      <ItemWithTitle title="第8条（秘密保持）">
        <p>
          ユーザーは、本サービスに関連して当方がユーザーに対して秘密に取扱うことを求めて開示した非公知の情報について、当方の事前の書面による承諾がある場合を除き、秘密に取扱うものとします。
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="第9条（本規約等の変更）">
        <p>
          当方は、当方が必要と認めた場合は、本規約を変更できるものとします。本規約を変更する場合、変更後の本規約の施行時期及び内容を当ウェブサイト上での掲示その他の適切な方法により周知し、またはユーザーに通知します。但し、法令上ユーザーの同意が必要となるような内容の変更の場合は、当方所定の方法でユーザーの同意を得るものとします。
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="第10条（連絡／通知）">
        <List type="ordered">
          <List.Item>
            本サービスに関する問い合わせその他ユーザーから当方に対する連絡または通知、及び本規約の変更に関する通知その他当方からユーザーに対する連絡または通知は、当方の定める方法で行うものとします。
          </List.Item>
          <List.Item>
            当方が登録事項に含まれるメールアドレスその他の連絡先に連絡または通知を行った場合、ユーザーは当該連絡または通知を受領したものとみなします。
          </List.Item>
        </List>
      </ItemWithTitle>

      <ItemWithTitle title="第11条（サービス利用契約上の地位の譲渡等）">
        <List type="ordered">
          <List.Item>
            ユーザーは、当方の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。
          </List.Item>
          <List.Item>
            当方は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びにユーザーの登録事項その他の顧客情報を当該事業譲渡の譲受人に譲渡することができるものとし、ユーザーは、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。
          </List.Item>
        </List>
      </ItemWithTitle>

      <ItemWithTitle title="第12条（分離可能性）">
        <p>
          本規約のいずれかの条項またはその一部が、消費者契約法その他の法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="第13条（準拠法及び管轄裁判所）">
        <List type="ordered">
          <List.Item>
            本規約及びサービス利用契約の準拠法は日本法とします。
          </List.Item>
          <List.Item>
            本規約またはサービス利用契約に起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </List.Item>
        </List>
      </ItemWithTitle>

      <ItemWithTitle>【2023年01月02日制定】</ItemWithTitle>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 500}>
          {(transitionStyles) => (
            <Button
              variant="outline"
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              TOPに戻る
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
};
