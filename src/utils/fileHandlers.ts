/**
 * @Description 文件处理器，用于解析不同格式的文件的文本内容
 * @Author: Qingchuan Zi
 */
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/build/pdf.worker.min.mjs';
export const FileHandler = {
    async handleFile(file: File): Promise<string> {
        const extension = file.name.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'html':
                return this.parseHTML(file);
            case 'md':
                return this.parseMarkdown(file);
            case 'pdf':
                return this.parsePDF(file);
            case 'txt':
                return this.parseText(file);
            case 'docx':
            case 'doc':
                return this.parseDoc(file);
            default:
                throw new Error('不支持的文件类型');
        }
    },

    async parseHTML(file: File): Promise<string> {
        const text = await file.text(); // 读取 HTML 文件内容
        const doc = new DOMParser().parseFromString(text, "text/html"); // 解析 HTML 文件为 DOM
        if (!doc.body) {
            console.warn("HTML 文件无有效内容");
            return '';
        }
        // 提取纯文本内容
        const rawText = doc.body.textContent || '';
        return rawText
            .split('\n') // 按行分割
            .map(line => line.trim()) // 去除每行的首尾空格
            .filter(line => line.length > 0) // 过滤掉空行
            .join('\n');
    },

    async parseMarkdown(file: File): Promise<string> {
        const text = await file.text(); // 读取 Markdown 文件内容
        return text
            .split('\n') // 按行分割
            .map(line => line.trim()) // 去除每行的首尾空格
            .filter(line => line.length > 0) // 过滤掉空行
            .join('\n');
    },

    async parsePDF(file: File): Promise<string> {
        try {
            // 读取文件内容为 ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();

            // 使用 pdfjs-dist 加载 PDF 文档
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            const numPages = pdf.numPages; // 获取总页数
            const textContent: string[] = [];

            // 遍历每一页提取文本内容
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const text = await page.getTextContent();
                text.items.forEach((item: any) => {
                    if (item.str) {
                        textContent.push(item.str);
                    }
                });
            }

            // 返回提取的文本内容，按行拼接并去除空行
            const res = textContent
                .map(line => line.trim()) // 去除每行的首尾空格
                .filter(line => line.length > 0) // 过滤掉空行
            ;
            let resStr = '';
            for (let i = 0; i < res.length; i++) {
                resStr += res[i];
            }
            return resStr;
        } catch (error) {
            console.error('PDF 解析失败:', error);
            return '无法解析 PDF 文件，请检查文件内容！';
        }
    },

    async parseText(file: File): Promise<string> {
        const text = await file.text(); // 直接读取 .txt 文件内容
        return text
            .split('\n') // 按行分割
            .map(line => line.trim()) // 去除每行的首尾空格
            .filter(line => line.length > 0) // 过滤掉空行
            .join('\n');
    },

    async parseDoc(file: File): Promise<string> {
        try {
            const arrayBuffer = await file.arrayBuffer(); // 读取文件内容为 ArrayBuffer
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .join('\n');
        } catch (error) {
            console.error('DOC/DOCX 解析失败:', error);
            return '无法解析 DOC/DOCX 文件，请检查文件内容！';
        }
    }
};