function pcm_print(num)
/*이미지 출력 함수 자바스크립트 이미지 순서가 거꾸로기 때문에 --로 작성*/
{
    var i;
    for(i=num;i>0;i--)
        {
            document.write("<div class='pcm_card' id='pcm_c"+i+"'></div>");
            
            document.write(" ");
        }
}

function pcm_gugu_print()
/*구구단 출력 함수*/
{
    var i;
    var j;
    for(i=2;i<10;i++)
        {
            document.write("<div class='gugu'>");
            for(j=1;j<10;j++)
                {
                    document.write(i+" x "+j+" = "+i*j+"<br>");
                }
            document.write("</div>");
        }
}