import { Word } from "@/types";
import { decodeHTMLEntities } from "./utils";

export function parseHtml(newWord: Word, html: string) {
  // word
  const headwordMatch = html.match(
    /<div class="hd_div" id="headword">.*?<strong>(.*?)<\/strong>/,
  );
  if (headwordMatch) {
    newWord.word = headwordMatch[1].trim();
  }

  // tip
  const tipMatch = html.match(/<div class="in_tip b_fpage">(.*?)<\/div>/);
  if (tipMatch) {
    newWord.tip = tipMatch[1].trim();
  }

  // dictionary
  const dictMatches = [
    ...html.matchAll(
      /<li><span class="pos">(.*?)<\/span><span class="def b_regtxt">(.*?)<\/span><\/li>/g,
    ),
  ];
  newWord.dictionary = dictMatches.map((match) => ({
    [match[1].trim()]: decodeHTMLEntities(
      match[2].replace(/<[^>]+>/g, "").trim(),
    ),
  }));

  // phonetic
  const phoneticMatches = [
    ...html.matchAll(
      /<div class="hd_pr(?:.*?) b_primtxt">(.*?)<\/div>\s*<div class="hd_tf">.*?data-mp3link="(.*?)"/g,
    ),
  ];
  newWord.phonetic = phoneticMatches.map((match) => ({
    [decodeHTMLEntities(match[1].trim())]: match[2],
  }));

  // example
  let exampleKey = "";
  let exampleValue = "";
  const exampleEnMatch = html.match(
    /<div class="sen_en b_regtxt">(.*?)<\/div>/,
  );
  const exampleCnMatch = html.match(
    /<div class="sen_cn b_regtxt">(.*?)<\/div>/,
  );
  if (exampleEnMatch) {
    exampleKey = exampleEnMatch[1].replace(/<[^>]+>/g, "").trim();
  }
  if (exampleCnMatch) {
    exampleValue = exampleCnMatch[1].replace(/<a.*?>(.*?)<\/a>/g, "$1").trim();
  }
  if (exampleKey.length && exampleValue.length) {
    newWord.example = [{ [exampleKey]: exampleValue }];
  }

  return newWord;
}
